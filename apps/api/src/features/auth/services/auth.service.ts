import { UserRepository } from '@features/user/repositories/user.repository'
import { UserDocument } from '@features/user/schemas/user.schema'
import { MAIL_QUEUE, VERIFICATION } from '@modules/mail/mail.constant'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from '../dto'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { OTPService } from '@modules/otp/otp.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly userRepository: UserRepository,
    private readonly otpService: OTPService
  ) {}

  public async register(dto: RegisterDto): Promise<void> {
    await this.userRepository.create(dto)
    const otpCode = await this.otpService.generateOTPCode(dto.email)
    await this.mailQueue.add(VERIFICATION, { email: dto.email, otpCode })
  }

  public async validateUser(username: string, password: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findOne({ username })
    const isPasswordCorrect = await this.userRepository.comparePasswords(username, password)

    if (!user || !isPasswordCorrect) {
      return null
    }
    return user
  }
}
