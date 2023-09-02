import { Injectable, NotFoundException } from '@nestjs/common'
import { WordRepository } from '../repositories'
import { CreateWordDto, UpdateWordDto } from '../dto'
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

  public async updateWordById(
    wordId: string,
    listId: string,
    dto: UpdateWordDto
  ): Promise<WordDocument> {
    const word = await this.wordRepository.findOne({ _id: wordId, listId })
    const { order, status, ...updateDto } = dto

    if (!word) {
      throw new NotFoundException('Word not found.')
    }
    if (status !== null) {
      await this.wordRepository.updateStatus(word, status)
    }
    if (order !== null) {
      await this.wordRepository.updateOrder(word, order, status)
    }
    return this.wordRepository.findByIdAndUpdate(wordId, updateDto)
  }

  public async removeWordById(wordId: string, listId: string): Promise<void> {
    const word = await this.wordRepository.findOne({ _id: wordId, listId })

    if (!word) {
      throw new NotFoundException('Word not found.')
    }
    await this.wordRepository.removeFromList(word)
  }
}
