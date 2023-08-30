import { Module } from '@nestjs/common'
import { WordService } from './services/word.service'
import { WordController } from './controllers/word.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Word, WordSchema } from './schemas'
import { WordRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])],
  controllers: [WordController],
  providers: [WordService, WordRepository],
  exports: [WordRepository]
})
export class WordModule {}
