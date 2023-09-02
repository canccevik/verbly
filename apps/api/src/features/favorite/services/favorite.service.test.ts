import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { FavoriteRepository } from '../repositories'
import { FavoriteService } from './favorite.service'
import { FavoriteDocument } from '../schemas'
import { BadRequestException } from '@nestjs/common'

describe('FavoriteService', () => {
  let favoriteService: FavoriteService
  let favoriteRepository: FavoriteRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [FavoriteService]
    })
      .useMocker(createMock)
      .compile()

    favoriteService = module.get<FavoriteService>(FavoriteService)
    favoriteRepository = module.get<FavoriteRepository>(FavoriteRepository)
  })

  it('should favorite service to be defined', () => {
    // ASSERT
    expect(favoriteService).toBeDefined()
  })

  it('should favorite repository to be defined', () => {
    // ASSERT
    expect(favoriteRepository).toBeDefined()
  })

  describe('addListToFavorites', () => {
    it('should add list to favorites', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null)

      // ACT
      const result = await favoriteService.addListToFavorites(listId, userId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(favoriteRepository.create).toHaveBeenCalledWith({ userId, listId })
    })

    it('should throw bad request exception when list favorited before', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'
      const favoriteMock = { userId, listId } as FavoriteDocument

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(favoriteMock)

      // ACT & ASSERT
      expect(favoriteService.addListToFavorites(userId, listId)).rejects.toThrowError(
        new BadRequestException('List already added to favorites before.')
      )
    })
  })
})
