import { Injectable } from '@nestjs/common'
import { ListRepository } from '../repositories'
import { CreateListDto } from '../dto'
import { ListDocument } from '../schemas'
import { UpdateListDto } from '../dto/update-list.dto'

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  public async createList(dto: CreateListDto, userId: string): Promise<ListDocument> {
    return this.listRepository.create({ ...dto, ownerId: userId })
  }

  public async updateList(dto: UpdateListDto, listId: string): Promise<ListDocument> {
    return this.listRepository.findByIdAndUpdate(listId, { $set: dto })
  }
}
