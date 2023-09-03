import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { FavoriteService } from '../services/favorite.service'
import { ApiTags } from '@nestjs/swagger'
import { Message, SkipSelfUserGuard, User } from '@core/decorators'
import { SelfUserGuard } from '@core/guards'
import { ListExistsGuard } from '../guards'
import { ListDocument } from '@features/list/schemas'

@Controller()
@ApiTags('favorites')
@UseGuards(SelfUserGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @SkipSelfUserGuard()
  @Message('Favorite lists fetched successfully.')
  public async getFavoriteListsByUserId(@Param('userId') userId: string): Promise<ListDocument[]> {
    return this.favoriteService.getFavoriteListsByUserId(userId)
  }

  @Post(':listId')
  @UseGuards(ListExistsGuard)
  @Message('List added to favorites successfully.')
  public async addListToFavorites(
    @User('id') userId: string,
    @Param('listId') listId: string
  ): Promise<void> {
    await this.favoriteService.addListToFavorites(listId, userId)
  }

  @Delete(':listId')
  @UseGuards(ListExistsGuard)
  @Message('List removed from favorites successfully.')
  public async removeListFromFavorites(
    @User('id') userId: string,
    @Param('listId') listId: string
  ): Promise<void> {
    await this.favoriteService.removeListFromFavorites(listId, userId)
  }
}
