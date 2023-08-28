import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { OTPService } from '@modules/otp/otp.service'
import otpGenerator from 'otp-generator'
import { OTPRepository } from './otp.repository'
import { OTPDocument } from './otp.schema'
import { BadRequestException } from '@nestjs/common'

describe('OTPService', () => {
  let otpService: OTPService
  let otpRepository: OTPRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [OTPService]
    })
      .useMocker(createMock)
      .compile()

    otpService = module.get<OTPService>(OTPService)
    otpRepository = module.get<OTPRepository>(OTPRepository)
  })

  it('should otp service to be defined', () => {
    // ASSERT
    expect(otpService).toBeDefined()
  })

  it('should otp repository to be defined', () => {
    // ASSERT
    expect(otpRepository).toBeDefined()
  })

  describe('generateOTPCode', () => {
    it('should create and return otp code', async () => {
      // ARRANGE
      const email = 'johndoe@gmail.com'

      const otpCode = '123456'
      jest.spyOn(otpGenerator, 'generate').mockReturnValue(otpCode)

      // ACT
      const result = await otpService.generateOTPCode(email)

      // ASSERT
      expect(result).toEqual(otpCode)
      expect(otpRepository.create).toHaveBeenCalledWith({ email, otpCode })
    })
  })

  describe('useOTPCode', () => {
    it('should remove the otp code when it is found', async () => {
      // ARRANGE
      const otpMock = { id: 'id', email: 'johndoe@gmail.com', otpCode: '123456' } as OTPDocument

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(otpMock)

      // ACT
      const result = await otpService.useOTPCode(otpMock.email, otpMock.otpCode)

      // ASSERT
      expect(result).toBeUndefined()
      expect(otpRepository.findByIdAndDelete).toHaveBeenCalledWith(otpMock.id)
    })

    it('should throw bad requet ersror when otp code not found', async () => {
      // ARRANGE
      const otpMock = { id: 'id', email: 'johndoe@gmail.com', otpCode: '123456' } as OTPDocument

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(otpService.useOTPCode(otpMock.email, otpMock.otpCode)).rejects.toThrowError(
        new BadRequestException('Email or OTP code is not correct.')
      )
    })
  })
})
