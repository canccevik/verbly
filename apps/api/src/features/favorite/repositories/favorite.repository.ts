import { BaseRepository } from '@common/repositories'
import { Favorite } from '../schemas'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class FavoriteRepository extends BaseRepository<Favorite> {
  constructor(@InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>) {
    super(favoriteModel)
  }
}
