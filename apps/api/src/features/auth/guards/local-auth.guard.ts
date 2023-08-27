import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context)
    const request = context.switchToHttp().getRequest<Request>()

    await super.logIn(request)
    return !!result
  }
}
