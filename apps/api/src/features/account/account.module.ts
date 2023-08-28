import { Module } from '@nestjs/common'
import { AccountService } from './services/account.service'
import { AccountController } from './controllers/account.controller'
import { UserModule } from '@features/user/user.module'
import { AuthModule } from '@features/auth/auth.module'

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
