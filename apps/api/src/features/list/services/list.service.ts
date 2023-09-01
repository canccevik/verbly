import { Injectable, NotFoundException } from '@nestjs/common'
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

  public async getListById(listId: string, userId: string): Promise<ListDocument> {
    const list = await this.listRepository
      .findOne({ _id: listId, ownerId: userId })
      .populate('words')

    if (!list) {
      throw new NotFoundException('List not found.')
    }
    return list
  }

  public async createList(userId: string, dto: CreateListDto): Promise<ListDocument> {
    return this.listRepository.create({ ownerId: userId, ...dto })
  }

  public async updateListById(listId: string, dto: UpdateListDto): Promise<ListDocument> {
    return this.listRepository.findByIdAndUpdate(listId, { $set: dto })
  }

  public async removeListById(listId: string): Promise<void> {
    await this.listRepository.findByIdAndDelete(listId)
  }
}
