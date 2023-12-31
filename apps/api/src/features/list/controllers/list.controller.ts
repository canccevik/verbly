import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ListService } from '../services/list.service'
import { ApiTags } from '@nestjs/swagger'
import { List, ListDocument } from '../schemas'
import { CreateListDto } from '../dto'
import { Message, SkipSelfUserGuard } from '@core/decorators'
import { SelfUserGuard } from '@core/guards'
import { UpdateListDto } from '../dto/update-list.dto'
import { ListOwnershipGuard } from '../guards'
import { FindAllResult } from '@common/repositories/types/queries.type'

@Controller()
@ApiTags('lists')
@UseGuards(SelfUserGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @SkipSelfUserGuard()
  @Message('Lists fetched successfully.')
  public async getListsByUserId(@Param('userId') userId: string): Promise<FindAllResult<List>> {
    return this.listService.getListsByUserId(userId)
  }

  @Post()
  @Message('List created successfully.')
  public async createList(
    @Body() dto: CreateListDto,
    @Param('userId') userId: string
  ): Promise<ListDocument> {
    return this.listService.createList(userId, dto)
  }

  @Get(':listId')
  @SkipSelfUserGuard()
  @Message('List fetched successfully.')
  public async getListById(
    @Param('listId') listId: string,
    @Param('userId') userId: string
  ): Promise<ListDocument> {
    return this.listService.getListById(listId, userId)
  }

  @Put(':listId')
  @UseGuards(ListOwnershipGuard)
  @Message('List updated successfully.')
  public async updateListById(
    @Body() dto: UpdateListDto,
    @Param('listId') listId: string
  ): Promise<ListDocument> {
    return this.listService.updateListById(listId, dto)
  }

  @Delete(':listId')
  @UseGuards(ListOwnershipGuard)
  @Message('List removed successfully.')
  public async removeListById(@Param('listId') listId: string): Promise<void> {
    await this.listService.removeListById(listId)
  }
}
