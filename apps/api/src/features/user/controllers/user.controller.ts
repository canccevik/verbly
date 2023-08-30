import { Body, Controller, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { ApiTags } from '@nestjs/swagger'
import { UserDocument } from '../schemas'
import { UpdateUserDto } from '../dto/update-user.dto'
import { Message, User } from '@core/decorators'
import { AuthenticatedGuard } from '@core/guards'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserPhotoPipe } from '../pipes'

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/me')
  @Message('User updated successfully.')
  public async updateUser(
    @Body() dto: UpdateUserDto,
    @User('id') userId: string
  ): Promise<UserDocument> {
    return this.userService.updateUser(dto, userId)
  }

  @Put('/me/profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  @Message('Profile photo updated successfully.')
  public async updateProfilePhoto(
    @User('id') userId: string,
    @UploadedFile(UserPhotoPipe) file: Express.Multer.File
  ): Promise<void> {
    await this.userService.updateProfilePhoto(userId, file)
  }
}
