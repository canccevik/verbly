import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { ListService } from '../services'
import { ListController } from './list.controller'
import { CreateListDto } from '../dto'
import { ListDocument } from '../schemas'
import { UpdateListDto } from '../dto/update-list.dto'

describe('ListController', () => {
  let listController: ListController
  let listService: ListService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ListController]
    })
      .useMocker(createMock)
      .compile()

    listController = module.get<ListController>(ListController)
    listService = module.get<ListService>(ListService)
  })

  it('should list controller to be defined', () => {
    // ASSERT
    expect(listController).toBeDefined()
  })

  it('should list service to be defined', () => {
    // ASSERT
    expect(listService).toBeDefined()
  })

  describe('createList', () => {
    it('should call create list method from list service', async () => {
      // ARRANGE
      const createListDto = { name: 'name' } as CreateListDto
      const listMock = createListDto as ListDocument
      const userId = 'id'

      jest.spyOn(listService, 'createList').mockResolvedValue(listMock)

      // ACT
      const result = await listController.createList(createListDto, userId)

      // ASSERT
      expect(result).toEqual(listMock)
      expect(listService.createList).toBeCalledWith(createListDto, userId)
    })
  })

  describe('updateList', () => {
    it('should call update list method from list service', async () => {
      // ARRANGE
      const updateListDto = { name: 'name' } as UpdateListDto
      const listMock = updateListDto as ListDocument
      const listId = 'id'

      jest.spyOn(listService, 'updateList').mockResolvedValue(listMock)

      // ACT
      const result = await listController.updateList(updateListDto, listId)

      // ASSERT
      expect(result).toEqual(listMock)
      expect(listService.updateList).toBeCalledWith(updateListDto, listId)
    })
  })
})
