import { Injectable } from '@nestjs/common'
import { ListRepository } from '../repositories'
import { CreateListDto } from '../dto'
import { ListDocument } from '../schemas'

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  public async createList(dto: CreateListDto, userId: string): Promise<ListDocument> {
    return this.listRepository.create({ ...dto, ownerId: userId })
  }
}
