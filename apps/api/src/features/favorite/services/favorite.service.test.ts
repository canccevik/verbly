import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { FavoriteRepository } from '../repositories'
import { FavoriteService } from './favorite.service'
import { FavoriteDocument } from '../schemas'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { UserRepository } from '@features/user/repositories'
import { UserDocument } from '@features/user/schemas'

describe('FavoriteService', () => {
  let favoriteService: FavoriteService
  let favoriteRepository: FavoriteRepository
  let userRepository: UserRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [FavoriteService]
    })
      .useMocker(createMock)
      .compile()

    favoriteService = module.get<FavoriteService>(FavoriteService)
    favoriteRepository = module.get<FavoriteRepository>(FavoriteRepository)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should favorite service to be defined', () => {
    // ASSERT
    expect(favoriteService).toBeDefined()
  })

  it('should favorite repository to be defined', () => {
    // ASSERT
    expect(favoriteRepository).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  describe('getFavoriteListsByUserId', () => {
    it('should get favorite lists by user id', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'
      const userMock = { id: userId } as UserDocument
      const favoriteListsMock = [{ userId, listId }] as FavoriteDocument[]

      jest.spyOn(userRepository, 'findById').mockResolvedValue(userMock)
      jest.spyOn(favoriteRepository, 'find').mockImplementation(
        // @ts-ignore
        jest.fn(() => ({
          populate: jest.fn(() => ({
            select: jest.fn(() => favoriteListsMock)
          }))
        }))
      )

      // ACT
      const result = await favoriteService.getFavoriteListsByUserId(userId)

      // ASSERT
      expect(result).toEqual([listId])
      expect(userRepository.findById).toHaveBeenCalledWith(userId)
      expect(favoriteRepository.find).toHaveBeenCalledWith({ userId })
    })

    it('should throw bad request exception when user not found', async () => {
      // ARRANGE
      const userId = 'user-id'

      jest.spyOn(userRepository, 'findById').mockResolvedValue(null)

      // ACT & ASSERT
      expect(favoriteService.getFavoriteListsByUserId(userId)).rejects.toThrowError(
        new NotFoundException('User not found.')
      )
    })
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

  describe('removeListFromFavorites', () => {
    it('should remove list from favorites', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'
      const favoriteMock = { userId, listId } as FavoriteDocument

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(favoriteMock)

      // ACT
      const result = await favoriteService.removeListFromFavorites(listId, userId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(favoriteRepository.deleteOne).toHaveBeenCalledWith({ userId, listId })
    })

    it('should throw bad request exception when list is not in favorites', async () => {
      // ARRANGE
      const userId = 'user-id'
      const listId = 'list-id'

      jest.spyOn(favoriteRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(favoriteService.removeListFromFavorites(userId, listId)).rejects.toThrowError(
        new BadRequestException('List is not in your favorites.')
      )
    })
  })
})
