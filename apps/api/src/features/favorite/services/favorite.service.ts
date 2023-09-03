import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { FavoriteRepository } from '../repositories'
import { ListDocument } from '@features/list/schemas'
import { UserRepository } from '@features/user/repositories'

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async getFavoriteListsByUserId(userId: string): Promise<ListDocument[]> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException('User not found.')
    }
    const listRecords = await this.favoriteRepository
      .find({ userId })
      .populate('listId')
      .select('listId')
    return listRecords.map((record) => record.listId) as unknown as ListDocument[]
  }

  public async addListToFavorites(listId: string, userId: string): Promise<void> {
    const isAlreadyFavorited = await this.favoriteRepository.findOne({ userId, listId })

    if (isAlreadyFavorited) {
      throw new BadRequestException('List already added to favorites before.')
    }
    await this.favoriteRepository.create({ userId, listId })
  }

  public async removeListFromFavorites(listId: string, userId: string): Promise<void> {
    const isListInFavorites = await this.favoriteRepository.findOne({ userId, listId })

    if (!isListInFavorites) {
      throw new BadRequestException('List is not in your favorites.')
    }
    await this.favoriteRepository.deleteOne({ userId, listId })
  }
}
