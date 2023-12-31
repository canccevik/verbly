import { Routes } from '@nestjs/core'
import { UserModule } from './user/user.module'
import { ListModule } from './list/list.module'
import { WordModule } from './word/word.module'
import { FavoriteModule } from './favorite/favorite.module'

export const routes: Routes = [
  {
    path: 'users',
    module: UserModule,
    children: [
      {
        path: ':userId/lists',
        module: ListModule,
        children: [
          {
            path: ':listId/words',
            module: WordModule
          }
        ]
      },
      {
        path: ':userId/favorites',
        module: FavoriteModule
      }
    ]
  }
]
