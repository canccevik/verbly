import { BadRequestException, Injectable } from '@nestjs/common'
import { OTPRepository } from './otp.repository'
import otpGenerator from 'otp-generator'

@Injectable()
export class OTPService {
  constructor(private readonly otpRepository: OTPRepository) {}

  public async generateOTPCode(email: string): Promise<string> {
    const otpCode = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })
    await this.otpRepository.create({ email, otpCode })
    return otpCode
  }

  public async useOTPCode(email: string, otpCode: string): Promise<void> {
    const otp = await this.otpRepository.findOne({ email, otpCode })

    if (!otp) {
      throw new BadRequestException('Email or OTP code is not correct.')
    }
    await this.otpRepository.findByIdAndDelete(otp.id)
  }
}
