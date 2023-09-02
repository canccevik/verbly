import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common'
import { FavoriteService } from '../services/favorite.service'
import { ApiTags } from '@nestjs/swagger'
import { Message, User } from '@core/decorators'
import { SelfUserGuard } from '@core/guards'
import { ListExistsGuard } from '../guards'

@Controller()
@ApiTags('favorites')
@UseGuards(SelfUserGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':listId')
  @UseGuards(ListExistsGuard)
  @Message('List added to favorites successfully.')
  public async addListToFavorites(
    @User('id') userId: string,
    @Param('listId') listId: string
  ): Promise<void> {
    await this.favoriteService.addListToFavorites(userId, listId)
  }

  @Delete(':listId')
  @UseGuards(ListExistsGuard)
  @Message('List removed from favorites successfully.')
  public async removeListFromFavorites(
    @User('id') userId: string,
    @Param('listId') listId: string
  ): Promise<void> {
    await this.favoriteService.removeListFromFavorites(userId, listId)
  }
}
