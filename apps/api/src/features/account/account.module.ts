import { Module } from '@nestjs/common'
import { AccountService } from './services/account.service'
import { AccountController } from './controllers/account.controller'
import { UserModule } from '@features/user/user.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'
import { OTPModule } from '@modules/otp/otp.module'

@Module({
  imports: [BullModule.registerQueue({ name: MAIL_QUEUE }), UserModule, OTPModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
