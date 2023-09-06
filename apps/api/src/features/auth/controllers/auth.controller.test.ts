import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AuthService } from '../services'
import { AuthController } from './auth.controller'
import { RegisterDto } from '../dto'
import { ExecutionContext } from '@nestjs/common'
import { Request, Response } from 'express'
import { ENV } from '@config/index'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: ENV,
          useValue: {}
        }
      ]
    })
      .useMocker(createMock)
      .compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('should auth controller to be defined', () => {
    // ASSERT
    expect(authController).toBeDefined()
  })

  it('should auth service to be defined', () => {
    // ASSERT
    expect(authService).toBeDefined()
  })

  describe('register', () => {
    it('should call register method from auth service', async () => {
      // ARRANGE
      const registerDto = { username: 'johndoe' } as RegisterDto

      // ACT
      const result = await authController.register(registerDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(authService.register).toHaveBeenCalledWith(registerDto)
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      // ARRANGE
      const context = createMock<ExecutionContext>()
      const req = context.switchToHttp().getRequest<Request>()
      const res = context.switchToHttp().getResponse<Response>()

      // ACT
      await authController.logout(req, res)

      // ASSERT
      expect(req.logout).toHaveBeenCalled()
    })
  })
})
