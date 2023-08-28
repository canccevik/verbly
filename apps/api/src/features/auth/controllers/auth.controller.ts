import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { Message } from '@core/decorators'
import { RegisterDto } from '../dto'
import { UserDocument } from '@features/user/schemas/user.schema'
import { GoogleOAuthGuard, LocalAuthGuard } from '../guards'
import { AuthenticatedGuard } from '@core/guards'
import { Request, Response } from 'express'
import { Payload } from '@core/interceptors'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Message('Registration is successful.')
  public async register(@Body() dto: RegisterDto): Promise<UserDocument> {
    return this.authService.register(dto)
  }

  @Post('login')
  @Message('Logged in successfully.')
  @UseGuards(LocalAuthGuard)
  public login(): void {}

  @Get('login/google')
  @UseGuards(GoogleOAuthGuard)
  public loginWithGoogle(): void {}

  @Get('login/google/callback')
  @UseGuards(GoogleOAuthGuard)
  @Message('Logged in successfully.')
  public loginWithGoogleCallback(): void {}

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  public logout(@Req() req: Request, @Res() res: Response): void {
    return req.logout((err) => {
      if (err) {
        throw err
      }
      res.json({
        message: 'Logged out successfully.',
        statusCode: HttpStatus.CREATED
      } as Payload)
    })
  }
}
