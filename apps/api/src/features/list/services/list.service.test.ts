import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { ListService } from './list.service'
import { ListRepository } from '../repositories'
import { CreateListDto } from '../dto'
import { ListDocument } from '../schemas'
import { UpdateListDto } from '../dto/update-list.dto'
import { NotFoundException } from '@nestjs/common'

describe('ListService', () => {
  let listService: ListService
  let listRepository: ListRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ListService]
    })
      .useMocker(createMock)
      .compile()

    listService = module.get<ListService>(ListService)
    listRepository = module.get<ListRepository>(ListRepository)
  })

  it('should list service to be defined', () => {
    // ASSERT
    expect(listService).toBeDefined()
  })

  it('should list repository to be defined', () => {
    // ASSERT
    expect(listRepository).toBeDefined()
  })

  describe('getListsByUserId', () => {
    it('should return all lists of user', async () => {
      // ARRANGE
      const userId = 'id'
      const resultMock = [{ name: 'list' } as ListDocument]

      jest.spyOn(listRepository, 'find').mockResolvedValue(resultMock)

      // ACT
      const result = await listService.getListsByUserId(userId)

      // ASSERT
      expect(result).toEqual(resultMock)
      expect(listRepository.find).toHaveBeenCalledWith({ ownerId: userId })
    })
  })

  describe('createList', () => {
    it('should create list', async () => {
      // ARRANGE
      const createListDto = { name: 'list' } as CreateListDto
      const listMock = createListDto as ListDocument
      const userId = 'id'

      jest.spyOn(listRepository, 'create').mockResolvedValue(listMock)

      // ACT
      const result = await listService.createList(userId, createListDto)

      // ASSERT
      expect(result).toEqual(listMock)
      expect(listRepository.create).toHaveBeenCalledWith({ ownerId: userId, ...createListDto })
    })
  })

  describe('getListById', () => {
    it('should return the list when list found', async () => {
      // ARRANGE
      const listId = 'id'
      const resultMock = { name: 'list' } as ListDocument

      jest.spyOn(listRepository, 'findOne').mockResolvedValue(resultMock)

      // ACT
      const result = await listService.getListById(listId)

      // ASSERT
      expect(result).toEqual(resultMock)
      expect(listRepository.findOne).toHaveBeenCalledWith({ _id: listId })
    })

    it('should throw not found exception when list not found', async () => {
      // ARRANGE
      const listId = 'id'

      jest.spyOn(listRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(listService.getListById(listId)).rejects.toThrowError(
        new NotFoundException('List not found.')
      )
    })
  })

  describe('updateListById', () => {
    it('should update list by id', async () => {
      // ARRANGE
      const updateListDto = { name: 'list' } as UpdateListDto
      const listMock = updateListDto as ListDocument
      const listId = 'id'

      jest.spyOn(listRepository, 'findByIdAndUpdate').mockResolvedValue(listMock)

      // ACT
      const result = await listService.updateListById(listId, updateListDto)

      // ASSERT
      expect(result).toEqual(listMock)
      expect(listRepository.findByIdAndUpdate).toHaveBeenCalledWith(listId, { $set: updateListDto })
    })
  })

  describe('removeListById', () => {
    it('should remove list by id', async () => {
      // ARRANGE
      const listId = 'id'

      // ACT
      const result = await listService.removeListById(listId)

      // ASSERT
      expect(result).toBeUndefined()
      expect(listRepository.findByIdAndDelete).toHaveBeenCalledWith(listId)
    })
  })
})
