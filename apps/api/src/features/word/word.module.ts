import { Module } from '@nestjs/common'
import { WordService } from './services/word.service'
import { WordController } from './controllers/word.controller'

@Module({
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
