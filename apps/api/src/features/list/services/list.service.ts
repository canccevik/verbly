import { Injectable } from '@nestjs/common'
import { ListRepository } from '../repositories'
import { CreateListDto } from '../dto'
import { List, ListDocument } from '../schemas'
import { UpdateListDto } from '../dto/update-list.dto'
import { FindAllResult } from '@common/repositories/types/queries.type'

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  public async getListsByUserId(userId: string): Promise<FindAllResult<List>> {
    return this.listRepository.find({ ownerId: userId })
  }

  public async createList(dto: CreateListDto, userId: string): Promise<ListDocument> {
    return this.listRepository.create({ ...dto, ownerId: userId })
  }

  public async updateList(dto: UpdateListDto, listId: string): Promise<ListDocument> {
    return this.listRepository.findByIdAndUpdate(listId, { $set: dto })
  }

  public async removeList(listId: string): Promise<void> {
    await this.listRepository.findByIdAndDelete(listId)
  }
}
