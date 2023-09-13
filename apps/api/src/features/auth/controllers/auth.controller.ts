import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { Message } from '@core/decorators'
import { RegisterDto } from '../dto'
import { FacebookAuthGuard, GoogleOAuthGuard, LocalAuthGuard, MicrosoftAuthGuard } from '../guards'
import { AuthenticatedGuard } from '@core/guards'
import { Request, Response } from 'express'
import { Payload } from '@core/interceptors'
import { Config, ENV } from '@config/index'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @Message('Registration is successful.')
  public async register(@Body() dto: RegisterDto): Promise<void> {
    await this.authService.register(dto)
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
  public loginWithGoogleCallback(@Res() res: Response): void {
    res.redirect(this.config.WEB_APP_ORIGIN)
  }

  @Get('login/facebook')
  @UseGuards(FacebookAuthGuard)
  public loginWithFacebook(): void {}

  @Get('login/facebook/callback')
  @UseGuards(FacebookAuthGuard)
  public loginWithFacebookCallback(@Res() res: Response): void {
    res.redirect(this.config.WEB_APP_ORIGIN)
  }

  @Get('login/microsoft')
  @UseGuards(MicrosoftAuthGuard)
  public loginWithMicrosoft(): void {}

  @Get('login/microsoft/callback')
  @UseGuards(MicrosoftAuthGuard)
  public loginWithMicrosoftCallback(@Res() res: Response): void {
    res.redirect(this.config.WEB_APP_ORIGIN)
  }

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
