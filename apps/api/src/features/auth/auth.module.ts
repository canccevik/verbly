import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { MongooseModule } from '@nestjs/mongoose'
import { OTP, OTPSchema } from './schemas'
import { OTPRepository } from './repositories'

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
