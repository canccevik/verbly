import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter'
import { createMock } from '@golevelup/ts-jest'
import { Response } from 'express'

describe('HttpExceptionFilter', () => {
  let context: ExecutionContext
  let exceptionFilter: HttpExceptionFilter<HttpException | Error>

  beforeAll(() => {
    context = createMock<ExecutionContext>()
    exceptionFilter = new HttpExceptionFilter()
  })

  it('should response with catched exception when catched exception is HttpException', () => {
    // ARRANGE
    const exception = new BadRequestException()

    // ACT
    exceptionFilter.catch(exception, context)
    const response = context.switchToHttp().getResponse<Response>()

    // ASSERT
    expect(response.status).toHaveBeenCalledWith(exception.getStatus())
    expect(response.json).toHaveBeenCalledWith(exception.getResponse())
  })

  it('should response with InternalServerErrorException when catched exception is not HttpException', () => {
    // ARRANGE
    const exception = new Error()
    const internalServerErrorException = new InternalServerErrorException()

    // ACT
    exceptionFilter.catch(exception, context)
    const response = context.switchToHttp().getResponse<Response>()

    // ASSERT
    expect(response.status).toHaveBeenCalledWith(internalServerErrorException.getStatus())
    expect(response.json).toHaveBeenCalledWith(internalServerErrorException.getResponse())
  })
})
