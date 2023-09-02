import { Module } from '@nestjs/common'
import { FavoriteService } from './services/favorite.service'
import { FavoriteController } from './controllers/favorite.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Favorite, FavoriteSchema } from './schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule {}
