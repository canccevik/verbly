import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { FavoriteService } from '../services'
import { FavoriteController } from './favorite.controller'

describe('FavoriteController', () => {
  let favoriteController: FavoriteController
  let favoriteService: FavoriteService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [FavoriteController]
    })
      .useMocker(createMock)
      .compile()

    favoriteController = module.get<FavoriteController>(FavoriteController)
    favoriteService = module.get<FavoriteService>(FavoriteService)
  })

  it('should favorite controller to be defined', () => {
    // ASSERT
    expect(favoriteController).toBeDefined()
  })

  it('should favorite service to be defined', () => {
    // ASSERT
    expect(favoriteService).toBeDefined()
  })

  describe('addListToFavorites', () => {
    it('should call add list to favorites method from word service', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'

      // ACT
      const result = await favoriteController.addListToFavorites(userId, listId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(favoriteService.addListToFavorites).toHaveBeenCalledWith(userId, listId)
    })
  })
})
