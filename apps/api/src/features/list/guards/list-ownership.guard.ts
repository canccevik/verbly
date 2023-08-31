import { CanActivate, ExecutionContext, Inject, NotFoundException } from '@nestjs/common'
import { ListRepository } from '../repositories'
import { Request } from 'express'
import { UserDocument } from '@features/user/schemas'

export class ListOwnershipGuard implements CanActivate {
  constructor(@Inject(ListRepository) private readonly listRepository: ListRepository) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as UserDocument
    const listId = request.params.listId

    const list = await this.listRepository.findById(listId)

    if (!list) {
      throw new NotFoundException('List not found.')
    }
    return list.ownerId.toString() === user.id
  }
}
