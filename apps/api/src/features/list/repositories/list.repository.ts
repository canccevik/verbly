import { BaseRepository } from '@common/repositories'
import { Injectable } from '@nestjs/common'
import { List } from '../schemas'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ListRepository extends BaseRepository<List> {
  constructor(@InjectModel(List.name) private readonly listModel: Model<List>) {
    super(listModel)
  }
}
