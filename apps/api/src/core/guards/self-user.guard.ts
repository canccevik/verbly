import { UserDocument } from '@features/user/schemas'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AuthenticatedGuard } from './authenticated.guard'

@Injectable()
export class SelfUserGuard extends AuthenticatedGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as UserDocument
    const isAuthenticated = super.canActivate(context)
    const hasAccess = user.id === request.params.userId

    return isAuthenticated && hasAccess
  }
}
