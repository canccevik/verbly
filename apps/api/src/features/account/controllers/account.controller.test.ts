import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AccountService } from '../services'
import { ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto, VerifyAccountDto } from '../dto'
import { AccountController } from './account.controller'
import { UserDocument } from '@features/user/schemas'

describe('AccountController', () => {
  let accountController: AccountController
  let accountService: AccountService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController]
    })
      .useMocker(createMock)
      .compile()

    accountController = module.get<AccountController>(AccountController)
    accountService = module.get<AccountService>(AccountService)
  })

  it('should account controller to be defined', () => {
    // ASSERT
    expect(accountController).toBeDefined()
  })

  it('should account service to be defined', () => {
    // ASSERT
    expect(accountService).toBeDefined()
  })

  describe('verifyAccount', () => {
    it('should call verify account method from account service', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = { email: 'johndoe@gmail.com', otpCode: '123456' }

      // ACT
      const result = await accountController.verifyAccount(verifyAccountDto)

      // ASSERT
      expect(result).toEqual(undefined)
      expect(accountService.verifyAccount).toHaveBeenCalledWith(verifyAccountDto)
    })
  })

  describe('sendResetPasswordMail', () => {
    it('should call send reset password mail method from account service', async () => {
      // ARRANGE
      const forgotPasswordDto: ForgotPasswordDto = { email: 'johndoe@gmail.com' }

      // ACT
      const result = await accountController.sendResetPasswordMail(forgotPasswordDto)

      // ASSERT
      expect(result).toEqual(undefined)
      expect(accountService.sendResetPasswordMail).toHaveBeenCalledWith(forgotPasswordDto)
    })
  })

  describe('resetPassword', () => {
    it('should call reset password method from account service', async () => {
      // ARRANGE
      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'john123' }

      // ACT
      const result = await accountController.resetPassword(resetPasswordDto)

      // ASSERT
      expect(result).toEqual(undefined)
      expect(accountService.resetPassword).toHaveBeenCalledWith(resetPasswordDto)
    })
  })

  describe('updatePassword', () => {
    it('should call update password method from account service', async () => {
      // ARRANGE
      const updatePasswordDto: UpdatePasswordDto = { oldPassword: 'pass', newPassword: 'pass' }
      const userMock = { id: 'id' } as UserDocument

      // ACT
      const result = await accountController.updatePassword(updatePasswordDto, userMock)

      // ASSERT
      expect(result).toEqual(undefined)
      expect(accountService.updatePassword).toHaveBeenCalledWith(updatePasswordDto, userMock)
    })
  })
})
