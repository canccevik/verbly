import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { Message } from '@core/decorators'
import { RegisterDto } from '../dto'
import { UserDocument } from '@features/user/schemas/user.schema'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('Registration is successful')
  public async register(@Body() dto: RegisterDto): Promise<UserDocument> {
    return this.authService.register(dto)
  }
}
