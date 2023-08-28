import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '@features/user/repositories'
import { ForgotPasswordDto, ResetPasswordDto, VerifyAccountDto } from '../dto'
import { AccountService } from './account.service'
import { Queue } from 'bull'
import { getQueueToken } from '@nestjs/bull'
import { RESET_PASSWORD, MAIL_QUEUE } from '@modules/mail/mail.constant'
import { OTPDocument } from '@modules/otp/otp.schema'
import { OTPService } from '@modules/otp/otp.service'
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException } from '@nestjs/common'

describe('AccountService', () => {
  let accountService: AccountService
  let userRepository: UserRepository
  let otpService: OTPService
  let jwtService: JwtService
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
    jwtService = module.get<JwtService>(JwtService)
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

  it('should jwt service to be defined', () => {
    // ASSERT
    expect(jwtService).toBeDefined()
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
      const token = 'token'

      jest.spyOn(jwtService, 'sign').mockReturnValue(token)

      // ACT
      const result = await accountService.sendResetPasswordMail(forgotPasswordDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(jwtService.sign).toHaveBeenCalledWith({ email: forgotPasswordDto.email })
      expect(mailQueue.add).toHaveBeenCalledWith(RESET_PASSWORD, {
        email: forgotPasswordDto.email,
        redirectUrl: token
      })
    })
  })

  describe('resetPassword', () => {
    it('should reset password of user', async () => {
      // ARRANGE
      const resetPasswordDto: ResetPasswordDto = { token: 'token', password: 'john123' }
      const payload = { email: 'johndoe@gmail.com' }
      const hashedPassword = 'hashed-password'

      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword)
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload)

      // ACT
      await accountService.resetPassword(resetPasswordDto)

      // ASSERT
      expect(jwtService.verify).toHaveBeenCalledWith(resetPasswordDto.token)
      expect(bcrypt.hashSync).toHaveBeenCalledWith(resetPasswordDto.password, 10)
      expect(userRepository.updateOne).toHaveBeenCalledWith(
        { email: payload.email },
        { $set: { password: hashedPassword } }
      )
    })

    it('should throw bad request error when trying to reset password with invalid token', async () => {
      // ARRANGE
      const resetPasswordDto: ResetPasswordDto = {
        token: 'token',
        password: 'john123'
      }

      jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })

      // ACT & ASSERT
      expect(accountService.resetPassword(resetPasswordDto)).rejects.toThrowError(
        new BadRequestException('Token is not valid')
      )
    })
  })
})
