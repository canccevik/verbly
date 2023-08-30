import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { validators } from '@common/validators'
import { AccountModule } from './account/account.module'
import { ListModule } from './list/list.module'
import { RouterModule, Routes } from '@nestjs/core'

const routes: Routes = [
  {
    path: 'users',
    module: UserModule,
    children: [
      {
        path: 'me/lists',
        module: ListModule
      }
    ]
  }
]

@Module({
  imports: [RouterModule.register(routes), UserModule, AuthModule, AccountModule, ListModule],
  providers: [...validators]
})
export class FeaturesModule {}
