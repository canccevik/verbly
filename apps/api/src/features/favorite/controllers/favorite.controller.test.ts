import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { FavoriteService } from '../services'
import { FavoriteController } from './favorite.controller'
import { ListDocument } from '@features/list/schemas'

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

  describe('getFavoriteListsByUserId', () => {
    it('should call get favorite lists by user id method from favorite service', async () => {
      // ARRANGE
      const userId = 'user-id'
      const favoriteListsMock = [{ name: 'test' }] as ListDocument[]

      jest.spyOn(favoriteService, 'getFavoriteListsByUserId').mockResolvedValue(favoriteListsMock)

      // ACT
      const result = await favoriteController.getFavoriteListsByUserId(userId)

      // ASSERT
      expect(result).toEqual(favoriteListsMock)
      expect(favoriteService.getFavoriteListsByUserId).toHaveBeenCalledWith(userId)
    })
  })

  describe('addListToFavorites', () => {
    it('should call add list to favorites method from favorite service', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'

      // ACT
      const result = await favoriteController.addListToFavorites(userId, listId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(favoriteService.addListToFavorites).toHaveBeenCalledWith(listId, userId)
    })
  })

  describe('removeListFromFavorites', () => {
    it('should call remove list from favorites method from favorite service', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'

      // ACT
      const result = await favoriteController.removeListFromFavorites(userId, listId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(favoriteService.removeListFromFavorites).toHaveBeenCalledWith(listId, userId)
    })
  })
})
