import { Module } from '@nestjs/common'
import { ListService } from './services/list.service'
import { ListController } from './controllers/list.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { List, ListSchema } from './schemas'
import { ListRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService, ListRepository],
  exports: [ListRepository]
})
export class ListModule {}
