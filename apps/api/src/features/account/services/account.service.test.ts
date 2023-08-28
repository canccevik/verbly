import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '@features/user/repositories'
import { VerifyAccountDto } from '../dto'
import { BadRequestException } from '@nestjs/common'
import { OTPRepository } from '@features/auth/repositories'
import { OTPDocument } from '@features/auth/schemas'
import { AccountService } from './account.service'

describe('AccountService', () => {
  let accountService: AccountService
  let userRepository: UserRepository
  let otpRepository: OTPRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountService]
    })
      .useMocker(createMock)
      .compile()

    accountService = module.get<AccountService>(AccountService)
    userRepository = module.get<UserRepository>(UserRepository)
    otpRepository = module.get<OTPRepository>(OTPRepository)
  })

  it('should account service to be defined', () => {
    // ASSERT
    expect(accountService).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  it('should otp repository to be defined', () => {
    // ASSERT
    expect(otpRepository).toBeDefined()
  })

  describe('verifyAccount', () => {
    it('should verify user when otp found', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = {
        email: 'johndoe@gmail.com',
        otpCode: '123456'
      }
      const otpMock = { id: 'id', ...verifyAccountDto } as OTPDocument

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(otpMock)

      // ACT
      const result = await accountService.verifyAccount(verifyAccountDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(otpRepository.findOne).toHaveBeenCalledWith({
        email: otpMock.email,
        otpCode: otpMock.otpCode
      })
      expect(otpRepository.findByIdAndDelete).toHaveBeenCalledWith(otpMock.id)
      expect(userRepository.updateOne).toHaveBeenCalledWith(
        { email: verifyAccountDto.email },
        { $set: { isEmailConfirmed: true } }
      )
    })

    it('should throw bad request error when otp not found', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = {
        email: 'johndoe@gmail.com',
        otpCode: '123456'
      }

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(accountService.verifyAccount(verifyAccountDto)).rejects.toThrowError(
        new BadRequestException('Email or OTP code is not correct.')
      )
    })
  })
})
