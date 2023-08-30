import { UserDocument } from '@features/user/schemas'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const User = createParamDecorator((fieldName: keyof UserDocument, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  const user = request.user
  return fieldName ? user[fieldName] : user
})
