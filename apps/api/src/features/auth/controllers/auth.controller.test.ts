import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AuthService } from '../services'
import { AuthController } from './auth.controller'
import { RegisterDto } from '../dto'
import { UserDocument } from '@features/user/schemas'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController]
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
      jest.spyOn(authService, 'register').mockResolvedValue(registerDto as UserDocument)

      // ACT
      const result = await authController.register(registerDto)

      // ASSERT
      expect(result).toEqual(registerDto)
      expect(authService.register).toBeCalledWith(registerDto)
    })
  })
})
