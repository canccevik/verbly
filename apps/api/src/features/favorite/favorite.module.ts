import { Module } from '@nestjs/common'
import { FavoriteService } from './services/favorite.service'
import { FavoriteController } from './controllers/favorite.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Favorite, FavoriteSchema } from './schemas'
import { FavoriteRepository } from './repositories'
import { ListModule } from '@features/list/list.module'
import { UserModule } from '@features/user/user.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
    ListModule,
    UserModule
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository]
})
export class FavoriteModule {}
