import { Controller } from '@nestjs/common'
import { FavoriteService } from '../services/favorite.service'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
}
