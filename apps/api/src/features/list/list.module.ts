import { Module } from '@nestjs/common'
import { ListService } from './services/list.service'
import { ListController } from './controllers/list.controller'

@Module({
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
