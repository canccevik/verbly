import { ListRepository } from '@features/list/repositories'
import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'

@Injectable()
export class ListExistsGuard implements CanActivate {
  constructor(@Inject(ListRepository) private readonly listRepository: ListRepository) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const { listId } = request.params

    const list = await this.listRepository.findById(listId)

    if (!list) {
      throw new NotFoundException('List not found.')
    }
    return true
  }
}
