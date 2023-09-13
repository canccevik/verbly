import {
  FacebookStrategy,
  GoogleStrategy,
  LocalStrategy,
  MicrosoftStrategy
} from './passport/strategies'
import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from './passport'
import { OTPModule } from '@modules/otp/otp.module'

@Module({
  imports: [
    BullModule.registerQueue({ name: MAIL_QUEUE }),
    PassportModule.register({ session: true }),
    UserModule,
    OTPModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    FacebookStrategy,
    MicrosoftStrategy,
    SessionSerializer
  ]
})
export class AuthModule {}
