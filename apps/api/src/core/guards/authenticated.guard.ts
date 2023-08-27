import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()

    if (!request.isAuthenticated()) {
      throw new UnauthorizedException()
    }
    return true
  }
}
