import { Body, Controller, Put, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { ApiTags } from '@nestjs/swagger'
import { UserDocument } from '../schemas'
import { UpdateUserDto } from '../dto/update-user.dto'
import { Message, User } from '@core/decorators'
import { AuthenticatedGuard } from '@core/guards'

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/me')
  @Message('User updated successfully.')
  public async updateUser(
    @Body() dto: UpdateUserDto,
    @User() user: UserDocument
  ): Promise<UserDocument> {
    return this.userService.updateUser(dto, user.id)
  }
}
