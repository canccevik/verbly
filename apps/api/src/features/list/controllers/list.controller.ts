import { Controller } from '@nestjs/common'
import { ListService } from '../services/list.service'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}
}
