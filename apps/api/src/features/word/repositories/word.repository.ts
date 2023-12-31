import { BaseRepository } from '@common/repositories'
import { Injectable } from '@nestjs/common'
import { Word, WordDocument } from '../schemas'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ListRepository } from '@features/list/repositories'

@Injectable()
export class WordRepository extends BaseRepository<Word> {
  constructor(
    @InjectModel(Word.name) private readonly wordModel: Model<Word>,
    private listRepository: ListRepository
  ) {
    super(wordModel)
  }

  public async updateOrder(
    word: WordDocument,
    newOrder: number,
    newStatus?: number
  ): Promise<void> {
    if (newStatus !== null) {
      await this.wordModel.updateMany(
        { listId: word.listId, status: newStatus, order: { $gte: newOrder } },
        { $inc: { order: 1 } }
      )
    } else if (newOrder < word.order) {
      await this.wordModel.updateMany(
        { listId: word.listId, status: word.status, order: { $lt: word.order, $gte: newOrder } },
        { $inc: { order: 1 } }
      )
    } else if (newOrder > word.order) {
      await this.wordModel.updateMany(
        { listId: word.listId, status: word.status, order: { $lte: newOrder, $gt: word.order } },
        { $inc: { order: -1 } }
      )
    }
    await this.wordModel.findByIdAndUpdate(word.id, { $set: { order: newOrder } })
  }

  public async updateStatus(word: WordDocument, newStatus: number): Promise<void> {
    if (word.status === newStatus) return

    await this.decrementHigherOrderWords(word)

    const wordCountInStatus = await this.wordModel
      .find({ listId: word.listId, status: newStatus })
      .count()

    await this.wordModel.findByIdAndUpdate(word.id, {
      $set: { status: newStatus, order: wordCountInStatus }
    })
  }

  public async removeFromList(word: WordDocument): Promise<void> {
    await this.decrementHigherOrderWords(word)
    await this.wordModel.findByIdAndDelete(word.id)
    await this.listRepository.findByIdAndUpdate(word.listId, { $pull: { words: word.id } })
  }

  private async decrementHigherOrderWords(word: WordDocument): Promise<void> {
    await this.wordModel.updateMany(
      {
        listId: word.listId,
        status: word.status,
        order: { $gt: word.order }
      },
      { $inc: { order: -1 } }
    )
  }
}
