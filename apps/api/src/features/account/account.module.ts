import { Module } from '@nestjs/common'
import { AccountService } from './services/account.service'
import { AccountController } from './controllers/account.controller'
import { UserModule } from '@features/user/user.module'
import { AuthModule } from '@features/auth/auth.module'
import { BullModule } from '@nestjs/bull'
import { MAIL_QUEUE } from '@modules/mail/mail.constant'

@Module({
  imports: [UserModule, AuthModule, BullModule.registerQueue({ name: MAIL_QUEUE })],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
