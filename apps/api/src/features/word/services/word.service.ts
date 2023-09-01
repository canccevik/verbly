import { Injectable } from '@nestjs/common'
import { WordRepository } from '../repositories'
import { CreateWordDto } from '../dto'
import { WordDocument, WordStatus } from '../schemas'
import { ListRepository } from '@features/list/repositories'

@Injectable()
export class WordService {
  constructor(
    private readonly wordRepository: WordRepository,
    private readonly listRepository: ListRepository
  ) {}

  public async createWord(listId: string, dto: CreateWordDto): Promise<WordDocument> {
    const wordStatus = dto.status || WordStatus.ToBeLearned

    const lastWordOfListArr = await this.wordRepository
      .find({ listId, status: wordStatus })
      .sort({ order: -1 })
      .limit(1)
    const order = lastWordOfListArr.length ? lastWordOfListArr[0].order + 1 : 0

    const word = await this.wordRepository.create({ listId, order, ...dto })
    await this.listRepository.findByIdAndUpdate(listId, { $push: { words: word.id } })
    return word
  }
}
