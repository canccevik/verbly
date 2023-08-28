import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '@features/user/repositories'
import { ForgotPasswordDto, VerifyAccountDto } from '../dto'
import { AccountService } from './account.service'
import { Queue } from 'bull'
import { getQueueToken } from '@nestjs/bull'
import { FORGOT_PASSWORD, MAIL_QUEUE } from '@modules/mail/mail.constant'
import { OTPDocument } from '@modules/otp/otp.schema'
import { OTPService } from '@modules/otp/otp.service'

describe('AccountService', () => {
  let accountService: AccountService
  let userRepository: UserRepository
  let otpService: OTPService
  let mailQueue: Queue

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: getQueueToken(MAIL_QUEUE), useValue: createMock<Queue>() }
      ]
    })
      .useMocker(createMock)
      .compile()

    accountService = module.get<AccountService>(AccountService)
    userRepository = module.get<UserRepository>(UserRepository)
    otpService = module.get<OTPService>(OTPService)
    mailQueue = module.get<Queue>(getQueueToken(MAIL_QUEUE))
  })

  it('should account service to be defined', () => {
    // ASSERT
    expect(accountService).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  it('should otp service to be defined', () => {
    // ASSERT
    expect(otpService).toBeDefined()
  })

  it('should mail queue to be defined', () => {
    // ASSERT
    expect(mailQueue).toBeDefined()
  })

  describe('verifyAccount', () => {
    it('should verify user', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = {
        email: 'johndoe@gmail.com',
        otpCode: '123456'
      }
      const otpMock = { id: 'id', ...verifyAccountDto } as OTPDocument

      // ACT
      const result = await accountService.verifyAccount(verifyAccountDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(otpService.useOTPCode).toHaveBeenCalledWith(otpMock.email, otpMock.otpCode)
      expect(userRepository.updateOne).toHaveBeenCalledWith(
        { email: verifyAccountDto.email },
        { $set: { isEmailConfirmed: true } }
      )
    })
  })

  describe('sendResetPasswordMail', () => {
    it('should create otp and send reset password mail', async () => {
      // ARRANGE
      const forgotPasswordDto: ForgotPasswordDto = { email: 'johndoe@gmail.com' }

      const otpCode = '123456'
      jest.spyOn(otpService, 'generateOTPCode').mockResolvedValue(otpCode)

      // ACT
      const result = await accountService.sendResetPasswordMail(forgotPasswordDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(otpService.generateOTPCode).toHaveBeenCalledWith(forgotPasswordDto.email)
      expect(mailQueue.add).toHaveBeenCalledWith(FORGOT_PASSWORD, {
        email: forgotPasswordDto.email,
        otpCode
      })
    })
  })
})
