import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
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

  @Get('/me')
  @Message('User fetched successfully.')
  public async getAuthenticatedUser(@User() user: UserDocument): Promise<UserDocument> {
    return this.userService.getAuthenticatedUser(user)
  }

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

  @Delete('/me/profile-photo')
  @Message('Profile photo removed successfully.')
  public async removeProfilePhoto(@User() user: UserDocument): Promise<void> {
    await this.userService.removeProfilePhoto(user)
  }
}
