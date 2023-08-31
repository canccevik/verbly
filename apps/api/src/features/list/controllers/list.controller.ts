import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ListService } from '../services/list.service'
import { ApiTags } from '@nestjs/swagger'
import { ListDocument } from '../schemas'
import { CreateListDto } from '../dto'
import { Message } from '@core/decorators'
import { SelfUserGuard } from '@core/guards'
import { UpdateListDto } from '../dto/update-list.dto'
import { ListOwnershipGuard } from '../guards'

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

  @Put(':listId')
  @UseGuards(ListOwnershipGuard)
  @Message('List updated successfully.')
  public async updateList(
    @Body() dto: UpdateListDto,
    @Param('listId') listId: string
  ): Promise<ListDocument> {
    return this.listService.updateList(dto, listId)
  }

  @Delete(':listId')
  @UseGuards(ListOwnershipGuard)
  @Message('List removed successfully.')
  public async removeList(@Param('listId') listId: string): Promise<void> {
    await this.listService.removeList(listId)
  }
}
