import { Module } from '@nestjs/common'
import { FavoriteService } from './services/favorite.service'
import { FavoriteController } from './controllers/favorite.controller'

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule {}
