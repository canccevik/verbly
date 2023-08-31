import { Module } from '@nestjs/common'
import { WordService } from './services/word.service'
import { WordController } from './controllers/word.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Word, WordSchema } from './schemas'
import { WordRepository } from './repositories'
import { ListModule } from '@features/list/list.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]), ListModule],
  controllers: [WordController],
  providers: [WordService, WordRepository]
})
export class WordModule {}
