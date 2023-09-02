import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common'
import { WordService } from '../services/word.service'
import { ApiTags } from '@nestjs/swagger'
import { WordDocument } from '../schemas'
import { Message } from '@core/decorators'
import { CreateWordDto, UpdateWordDto } from '../dto'
import { SelfUserGuard } from '@core/guards'
import { ListOwnershipGuard } from '@features/list/guards'

@Controller()
@ApiTags('words')
@UseGuards(SelfUserGuard, ListOwnershipGuard)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @Message('Word created successfully.')
  public async createWord(
    @Body() dto: CreateWordDto,
    @Param('listId') listId: string
  ): Promise<WordDocument> {
    return this.wordService.createWord(listId, dto)
  }

  @Put(':wordId')
  @Message('Word updated successfully.')
  public async updateWordById(
    @Body() dto: UpdateWordDto,
    @Param('listId') listId: string,
    @Param('wordId') wordId: string
  ): Promise<WordDocument> {
    return this.wordService.updateWordById(wordId, listId, dto)
  }

  @Delete(':wordId')
  @Message('Word removed successfully.')
  public async removeWordById(
    @Param('listId') listId: string,
    @Param('wordId') wordId: string
  ): Promise<void> {
    await this.wordService.removeWordById(wordId, listId)
  }
}
