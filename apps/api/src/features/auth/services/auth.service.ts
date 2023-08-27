import { UserRepository } from '@features/user/repositories/user.repository'
import { UserDocument } from '@features/user/schemas/user.schema'
import { MAIL_QUEUE, VERIFICATION } from '@modules/mail/mail.constant'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from '../dto'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { OTPRepository } from '../repositories'
import otpGenerator from 'otp-generator'

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OTPRepository
  ) {}

  public async register(dto: RegisterDto): Promise<UserDocument> {
    const otpCode = await this.generateOtpCode(dto.email)
    const user = await this.userRepository.create(dto)
    user.password = undefined

    await this.mailQueue.add(VERIFICATION, { email: dto.email, otpCode })
    return user
  }

  private async generateOtpCode(email: string): Promise<string> {
    const otpCode = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    })
    await this.otpRepository.create({ email, otpCode })
    return otpCode
  }
}
