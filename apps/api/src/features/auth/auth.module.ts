import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { MongooseModule } from '@nestjs/mongoose'
import { OTP, OTPRepository, OTPSchema } from './otp'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]),
    BullModule.registerQueue({ name: MAIL_QUEUE }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, OTPRepository]
})
export class AuthModule {}
