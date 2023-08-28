import { OTPRepository } from '@features/auth/repositories'
import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ForgotPasswordDto, VerifyAccountDto } from '../dto'
import otpGenerator from 'otp-generator'
import { InjectQueue } from '@nestjs/bull'
import { FORGOT_PASSWORD, MAIL_QUEUE } from '@modules/mail/mail.constant'
import { Queue } from 'bull'

@Injectable()
export class AccountService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
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

  public async sendResetPasswordMail(dto: ForgotPasswordDto): Promise<void> {
    const otpCode = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })
    await this.otpRepository.create({ email: dto.email, otpCode })
    await this.mailQueue.add(FORGOT_PASSWORD, { email: dto.email, otpCode })
  }
}
