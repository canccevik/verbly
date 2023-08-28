import { UserRepository } from '@features/user/repositories'
import { Injectable } from '@nestjs/common'
import { ForgotPasswordDto, VerifyAccountDto } from '../dto'
import { InjectQueue } from '@nestjs/bull'
import { MAIL_QUEUE, RESET_PASSWORD } from '@modules/mail/mail.constant'
import { OTPService } from '@modules/otp/otp.service'
import { Queue } from 'bull'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AccountService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly userRepository: UserRepository,
    private readonly otpService: OTPService,
    private readonly jwtService: JwtService
  ) {}

  public async verifyAccount(dto: VerifyAccountDto): Promise<void> {
    await this.otpService.useOTPCode(dto.email, dto.otpCode)
    await this.userRepository.updateOne({ email: dto.email }, { $set: { isEmailConfirmed: true } })
  }

  public async sendResetPasswordMail(dto: ForgotPasswordDto): Promise<void> {
    const token = this.jwtService.sign({ email: dto.email })
    // TODO: set the redirectUrl as the frontend reset password page url
    const redirectUrl = token
    await this.mailQueue.add(RESET_PASSWORD, { email: dto.email, redirectUrl })
  }
}