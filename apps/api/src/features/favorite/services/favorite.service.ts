import { BadRequestException, Injectable } from '@nestjs/common'
import { FavoriteRepository } from '../repositories'

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  public async addListToFavorites(listId: string, userId: string): Promise<void> {
    const isAlreadyFavorited = await this.favoriteRepository.findOne({ userId, listId })

    if (isAlreadyFavorited) {
      throw new BadRequestException('List already added to favorites before.')
    }
    await this.favoriteRepository.create({ userId, listId })
  }
}
