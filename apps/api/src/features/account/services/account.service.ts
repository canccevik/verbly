import { UserRepository } from '@features/user/repositories'
import { Injectable } from '@nestjs/common'
import { ForgotPasswordDto, VerifyAccountDto } from '../dto'
import { InjectQueue } from '@nestjs/bull'
import { FORGOT_PASSWORD, MAIL_QUEUE } from '@modules/mail/mail.constant'
import { OTPService } from '@modules/otp/otp.service'
import { Queue } from 'bull'

@Injectable()
export class AccountService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly userRepository: UserRepository,
    private readonly otpService: OTPService
  ) {}

  public async verifyAccount(dto: VerifyAccountDto): Promise<void> {
    await this.otpService.useOTPCode(dto.email, dto.otpCode)
    await this.userRepository.updateOne({ email: dto.email }, { $set: { isEmailConfirmed: true } })
  }

  public async sendResetPasswordMail(dto: ForgotPasswordDto): Promise<void> {
    const otpCode = await this.otpService.generateOTPCode(dto.email)
    await this.mailQueue.add(FORGOT_PASSWORD, { email: dto.email, otpCode })
  }
}
