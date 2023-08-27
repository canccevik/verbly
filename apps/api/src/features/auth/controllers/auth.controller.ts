import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { Message } from '@core/decorators'
import { RegisterDto, VerifyAccountDto } from '../dto'
import { UserDocument } from '@features/user/schemas/user.schema'
import { LocalAuthGuard } from '../guards'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('Registration is successful.')
  public async register(@Body() dto: RegisterDto): Promise<UserDocument> {
    return this.authService.register(dto)
  }

  @Post('verification')
  @Message('Account verified successfully.')
  public async verifyAccount(@Body() dto: VerifyAccountDto): Promise<void> {
    await this.authService.verifyAccount(dto)
  }

  @Post('login')
  @Message('Logged in successfully.')
  @UseGuards(LocalAuthGuard)
  public login(): void {}
}
