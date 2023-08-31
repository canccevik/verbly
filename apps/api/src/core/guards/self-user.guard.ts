import { UserDocument } from '@features/user/schemas'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AuthenticatedGuard } from './authenticated.guard'
import { Reflector } from '@nestjs/core'
import { SkipSelfUserGuard } from '@core/decorators'

@Injectable()
export class SelfUserGuard extends AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as UserDocument

    const isAuthenticated = super.canActivate(context)
    const hasAccess = user.id === request.params.userId
    const skipSelfUserGuard = this.reflector.get(SkipSelfUserGuard, context.getHandler())

    return !!skipSelfUserGuard || (isAuthenticated && hasAccess)
  }
}
