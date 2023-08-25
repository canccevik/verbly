import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { validators } from '@common/validators'

@Module({
  imports: [AuthModule, UserModule],
  providers: [...validators]
})
export class FeaturesModule {}
