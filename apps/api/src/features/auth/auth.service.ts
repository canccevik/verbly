import { UserRepository } from '@features/user/user.repository'
import { UserDocument } from '@features/user/user.schema'
import { MAIL_QUEUE, VERIFICATION } from '@modules/mail/mail.constant'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import crypto from 'crypto'
import { OTPRepository } from './otp'

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue,
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OTPRepository
  ) {}

  public async register(dto: RegisterDto): Promise<UserDocument> {
    const otpCode = crypto.randomBytes(3).toString('hex').toUpperCase()
    await this.otpRepository.create({ email: dto.email, otpCode })

    const user = await this.userRepository.create(dto)
    user.password = undefined

    await this.mailQueue.add(VERIFICATION, { email: dto.email, otpCode })
    return user
  }
}
