import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { MongooseModule } from '@nestjs/mongoose'
import { OTP, OTPSchema } from './schemas'
import { OTPRepository } from './repositories'
import { PassportModule } from '@nestjs/passport'
import { GoogleStrategy, LocalStrategy } from './passport/strategies'
import { SessionSerializer } from './passport'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
    BullModule.registerQueue({ name: MAIL_QUEUE }),
    PassportModule.register({ session: true }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, OTPRepository, LocalStrategy, GoogleStrategy, SessionSerializer],
  exports: [OTPRepository]
})
export class AuthModule {}
