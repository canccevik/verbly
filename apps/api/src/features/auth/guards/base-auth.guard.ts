import { ExecutionContext, Type } from '@nestjs/common'
import { AuthGuard, IAuthGuard } from '@nestjs/passport'
import { Request } from 'express'

export function BaseAuthGuard(type: string): Type<IAuthGuard> {
  return class extends AuthGuard(type) {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const result = await super.canActivate(context)
      const request = context.switchToHttp().getRequest<Request>()

      await super.logIn(request)
      return !!result
    }
  }
}
