import { Module } from '@nestjs/common'
import { AccountService } from './services/account.service'
import { AccountController } from './controllers/account.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { OTPModule } from '@modules/otp/otp.module'
import { JwtModule } from '@modules/jwt/jwt.module'

@Module({
  imports: [BullModule.registerQueue({ name: MAIL_QUEUE }), UserModule, JwtModule, OTPModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
