import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { validators } from '@core/validators'
import { AccountModule } from './account/account.module'

@Module({
  imports: [AuthModule, UserModule, AccountModule],
  providers: [...validators]
})
export class FeatureModule {}
