import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { ListService } from './list.service'
import { ListRepository } from '../repositories'
import { CreateListDto } from '../dto'
import { ListDocument } from '../schemas'

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

  describe('createList', () => {
    it('should create list', async () => {
      // ARRANGE
      const createListDto = { name: 'list' } as CreateListDto
      const listMock = createListDto as ListDocument
      const userId = 'id'

      jest.spyOn(listRepository, 'create').mockResolvedValue(listMock)

      // ACT
      const result = await listService.createList(createListDto, userId)

      // ASSERT
      expect(result).toEqual(listMock)
      expect(listRepository.create).toHaveBeenCalledWith({ ...createListDto, ownerId: userId })
    })
  })
})
