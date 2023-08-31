import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { WordService } from '../services'
import { WordController } from './word.controller'
import { CreateWordDto } from '../dto'
import { WordDocument } from '../schemas'

describe('WordController', () => {
  let wordController: WordController
  let wordService: WordService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [WordController]
    })
      .useMocker(createMock)
      .compile()

    wordController = module.get<WordController>(WordController)
    wordService = module.get<WordService>(WordService)
  })

  it('should word controller to be defined', () => {
    // ASSERT
    expect(wordController).toBeDefined()
  })

  it('should word service to be defined', () => {
    // ASSERT
    expect(wordService).toBeDefined()
  })

  describe('createWord', () => {
    it('should call create word method from word service', async () => {
      // ARRANGE
      const listId = 'id'
      const createWordDto = { word: 'test' } as CreateWordDto
      const wordMock = createWordDto as WordDocument

      jest.spyOn(wordService, 'createWord').mockResolvedValue(wordMock)

      // ACT
      const result = await wordController.createWord(createWordDto, listId)

      // ASSERT
      expect(result).toEqual(wordMock)
      expect(wordService.createWord).toHaveBeenCalledWith(listId, createWordDto)
    })
  })
})
