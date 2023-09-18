import { UserRepository } from '@features/user/repositories'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto, VerifyAccountDto } from '../dto'
import { InjectQueue } from '@nestjs/bull'
import { MAIL_QUEUE, RESET_PASSWORD } from '@modules/mail/mail.constant'
import { OTPService } from '@modules/otp/otp.service'
import { Queue } from 'bull'
import { JwtService } from '@nestjs/jwt'
import { UserDocument } from '@features/user/schemas'
import { Config, ENV } from '@config/index'

@Injectable()
export class AccountService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    @Inject(ENV) private readonly config: Config,
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
    const redirectUrl = `${this.config.WEB_APP_ORIGIN}/reset-password?token=${token}`
    await this.mailQueue.add(RESET_PASSWORD, { email: dto.email, redirectUrl })
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    try {
      const payload = this.jwtService.verify<{ email: string }>(dto.token)
      await this.userRepository.updatePassword({ email: payload.email }, dto.password)
    } catch (error) {
      throw new BadRequestException('Token is not valid.')
    }
  }

  public async updatePassword(dto: UpdatePasswordDto, user: UserDocument): Promise<void> {
    if (user.hasPassword) {
      const isOldPasswordCorrect = await this.userRepository.comparePasswords(
        user.username,
        dto.oldPassword
      )

      if (!isOldPasswordCorrect) {
        throw new BadRequestException('Old password is wrong.')
      }
    } else {
      await this.userRepository.findByIdAndUpdate(user.id, { $set: { hasPassword: true } })
    }
    await this.userRepository.updatePassword({ _id: user.id }, dto.newPassword)
  }
}
