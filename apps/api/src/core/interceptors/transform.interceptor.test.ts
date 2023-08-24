import { CallHandler, ExecutionContext, HttpStatus, SetMetadata } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { TransformInterceptor } from './transform.interceptor'
import { lastValueFrom, of } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { Message } from '@core/decorators'

interface User {
  id: number
  username: string
}

describe('TransformInterceptor', () => {
  let context: ExecutionContext
  let transformInterceptor: TransformInterceptor<User>

  beforeEach(() => {
    context = createMock<ExecutionContext>()
    transformInterceptor = new TransformInterceptor(new Reflector())
  })

  it('should wrap the response with data, status code and message', async () => {
    // ARRANGE
    const user: User = {
      id: 1,
      username: 'johndoe'
    }
    const message = 'User fetched successfully'

    SetMetadata(Message.KEY, message)(context.getHandler())

    context.switchToHttp().getResponse<Response>().statusCode = HttpStatus.OK

    const callHandler = createMock<CallHandler>({
      handle: () => of(user)
    })

    // ACT
    const userObservable = transformInterceptor.intercept(context, callHandler)
    const result = await lastValueFrom(userObservable)

    // ASSERT
    expect(result).toEqual({
      message,
      statusCode: HttpStatus.OK,
      data: { ...user }
    })
  })
})
