import { Module } from '@nestjs/common'
import { ListService } from './services/list.service'
import { ListController } from './controllers/list.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { List, ListSchema } from './schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
