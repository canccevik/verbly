import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { WordRepository } from '../repositories'
import { WordService } from './word.service'
import { CreateWordDto } from '../dto'
import { WordDocument } from '../schemas'

describe('WordService', () => {
  let wordService: WordService
  let wordRepository: WordRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [WordService]
    })
      .useMocker(createMock)
      .compile()

    wordService = module.get<WordService>(WordService)
    wordRepository = module.get<WordRepository>(WordRepository)
  })

  it('should word service to be defined', () => {
    // ASSERT
    expect(wordService).toBeDefined()
  })

  it('should word repository to be defined', () => {
    // ASSERT
    expect(wordRepository).toBeDefined()
  })

  describe('createWord', () => {
    it('should create word', async () => {
      // ARRANGE
      const createWordDto = { word: 'test' } as CreateWordDto
      const wordMock = { ...createWordDto, order: 0 } as WordDocument
      const listId = 'id'

      jest.spyOn(wordRepository, 'create').mockResolvedValue(wordMock)

      // ACT
      const result = await wordService.createWord(listId, createWordDto)

      // ASSERT
      expect(result).toEqual(wordMock)
      expect(wordRepository.create).toHaveBeenCalledWith({
        listId,
        order: NaN,
        ...createWordDto
      })
    })
  })
})
