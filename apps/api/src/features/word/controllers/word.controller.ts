import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { WordService } from '../services/word.service'
import { ApiTags } from '@nestjs/swagger'
import { WordDocument } from '../schemas'
import { Message } from '@core/decorators'
import { CreateWordDto } from '../dto'
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
}
