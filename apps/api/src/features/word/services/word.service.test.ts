import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { WordRepository } from '../repositories'
import { WordService } from './word.service'
import { CreateWordDto, UpdateWordDto } from '../dto'
import { WordDocument } from '../schemas'
import { ListRepository } from '@features/list/repositories'
import { NotFoundException } from '@nestjs/common'

describe('WordService', () => {
  let wordService: WordService
  let wordRepository: WordRepository
  let listRepository: ListRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [WordService]
    })
      .useMocker(createMock)
      .compile()

    wordService = module.get<WordService>(WordService)
    wordRepository = module.get<WordRepository>(WordRepository)
    listRepository = module.get<ListRepository>(ListRepository)
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
    it('should create word and add to list', async () => {
      // ARRANGE
      const createWordDto = { word: 'test' } as CreateWordDto
      const wordMock = { ...createWordDto, order: 0, status: 0 } as WordDocument
      const listId = 'id'

      jest.spyOn(wordRepository, 'create').mockResolvedValue(wordMock)
      jest.spyOn(wordRepository, 'find').mockImplementation(
        // @ts-ignore
        jest.fn(() => ({
          sort: jest.fn(() => ({
            limit: jest.fn(() => wordMock)
          }))
        }))
      )

      // ACT
      const word = await wordService.createWord(listId, createWordDto)

      // ASSERT
      expect(word).toEqual(wordMock)
      expect(wordRepository.find).toHaveBeenCalledWith({ listId, status: wordMock.status })
      expect(wordRepository.create).toHaveBeenCalledWith({
        listId,
        order: wordMock.order,
        ...createWordDto
      })
      expect(listRepository.findByIdAndUpdate).toHaveBeenCalledWith(listId, {
        $push: { words: word.id }
      })
    })
  })

  describe('updateWordById', () => {
    it('should update word', async () => {
      // ARRANGE
      const wordId = 'word-id'
      const listId = 'list-id'
      const updateWordDto = { word: 'test', status: 0, order: 0 } as UpdateWordDto
      const wordMock = { id: wordId, ...updateWordDto } as WordDocument

      jest.spyOn(wordRepository, 'findOne').mockResolvedValue(wordMock)
      jest.spyOn(wordRepository, 'findByIdAndUpdate').mockResolvedValue(wordMock)

      // ACT
      const word = await wordService.updateWordById(wordId, listId, updateWordDto)

      // ASSERT
      expect(word).toEqual(wordMock)
      expect(wordRepository.findOne).toHaveBeenCalledWith({ _id: wordId, listId })
      expect(wordRepository.updateStatus).toHaveBeenCalledWith(wordMock, wordMock.status)
      expect(wordRepository.updateOrder).toHaveBeenCalledWith(
        wordMock,
        wordMock.order,
        wordMock.status
      )
      expect(wordRepository.findByIdAndUpdate).toHaveBeenCalledWith(wordMock.id, {
        word: updateWordDto.word
      })
    })

    it('should throw not found error when word not found', async () => {
      // ARRANGE
      const wordId = 'word-id'
      const listId = 'list-id'
      const updateWordDto = { word: 'test' } as UpdateWordDto

      jest.spyOn(wordRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(wordService.updateWordById(wordId, listId, updateWordDto)).rejects.toThrowError(
        new NotFoundException('Word not found.')
      )
    })
  })

  describe('removeWordById', () => {
    it('should remove word', async () => {
      // ARRANGE
      const wordId = 'word-id'
      const listId = 'list-id'
      const wordMock = { id: wordId, word: 'test', status: 0, order: 0 } as WordDocument

      jest.spyOn(wordRepository, 'findOne').mockResolvedValue(wordMock)

      // ACT
      const word = await wordService.removeWordById(wordId, listId)

      // ASSERT
      expect(word).toBeUndefined()
      expect(wordRepository.findOne).toHaveBeenCalledWith({ _id: wordId, listId })
      expect(wordRepository.removeFromList).toHaveBeenCalledWith(wordMock)
    })

    it('should throw not found error when word not found', async () => {
      // ARRANGE
      const wordId = 'word-id'
      const listId = 'list-id'

      jest.spyOn(wordRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(wordService.removeWordById(wordId, listId)).rejects.toThrowError(
        new NotFoundException('Word not found.')
      )
    })
  })
})
