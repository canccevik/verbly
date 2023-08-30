import { Module } from '@nestjs/common'
import { WordService } from './services/word.service'
import { WordController } from './controllers/word.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Word, WordSchema } from './schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
