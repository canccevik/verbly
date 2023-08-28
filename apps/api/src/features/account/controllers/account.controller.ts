import { Body, Controller, Post } from '@nestjs/common'
import { AccountService } from '../services/account.service'
import { Message } from '@core/decorators'
import { ForgotPasswordDto, VerifyAccountDto } from '../dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('verification')
  @Message('Account verified successfully.')
  public async verifyAccount(@Body() dto: VerifyAccountDto): Promise<void> {
    await this.accountService.verifyAccount(dto)
  }

  @Post('forgot-password')
  @Message('Password reset email sent successfully.')
  public async sendResetPasswordMail(@Body() dto: ForgotPasswordDto): Promise<void> {
    await this.accountService.sendResetPasswordMail(dto)
  }
}
