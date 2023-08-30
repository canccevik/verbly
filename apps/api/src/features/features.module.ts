import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { validators } from '@common/validators'
import { AccountModule } from './account/account.module'
import { ListModule } from './list/list.module'
import { RouterModule } from '@nestjs/core'
import { WordModule } from './word/word.module'
import { routes } from './routes'

@Module({
  imports: [
    RouterModule.register(routes),
    UserModule,
    AuthModule,
    AccountModule,
    ListModule,
    WordModule
  ],
  providers: [...validators]
})
export class FeaturesModule {}
