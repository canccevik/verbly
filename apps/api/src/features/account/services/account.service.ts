import { OTPRepository } from '@features/auth/repositories'
import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Injectable } from '@nestjs/common'
import { VerifyAccountDto } from '../dto'

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OTPRepository
  ) {}

  public async verifyAccount(dto: VerifyAccountDto): Promise<void> {
    const otp = await this.otpRepository.findOne({ email: dto.email, otpCode: dto.otpCode })

    if (!otp) {
      throw new BadRequestException('Email or OTP code is not correct.')
    }
    await this.otpRepository.findByIdAndDelete(otp.id)
    await this.userRepository.updateOne({ email: dto.email }, { $set: { isEmailConfirmed: true } })
  }
}
