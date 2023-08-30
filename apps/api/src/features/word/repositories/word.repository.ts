import { BaseRepository } from '@common/repositories'
import { Injectable } from '@nestjs/common'
import { Word } from '../schemas'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class WordRepository extends BaseRepository<Word> {
  constructor(@InjectModel(Word.name) private readonly wordModel: Model<Word>) {
    super(wordModel)
  }
}
