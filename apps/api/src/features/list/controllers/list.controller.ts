import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ListService } from '../services/list.service'
import { ApiTags } from '@nestjs/swagger'
import { ListDocument } from '../schemas'
import { CreateListDto } from '../dto'
import { Message } from '@core/decorators'
import { SelfUserGuard } from '@core/guards'

@Controller()
@ApiTags('lists')
@UseGuards(SelfUserGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @Message('List created successfully.')
  public async createList(
    @Body() dto: CreateListDto,
    @Param('userId') userId: string
  ): Promise<ListDocument> {
    return this.listService.createList(dto, userId)
  }
}
