import { Controller } from '@nestjs/common'
import { WordService } from '../services/word.service'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}
}
