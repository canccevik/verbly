import { AuthenticatedContext } from '@core/context'
import { UserDocument } from '@features/user/schemas'
import { RequestContext } from '@medibloc/nestjs-request-context'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()

    if (!request.isAuthenticated()) {
      throw new UnauthorizedException()
    }
    const ctx: AuthenticatedContext = RequestContext.get()
    ctx.user = request.user as UserDocument
    return true
  }
}
