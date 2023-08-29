import { Body, Controller, Post, Put } from '@nestjs/common'
import { AccountService } from '../services/account.service'
import { Message, User } from '@core/decorators'
import { ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto, VerifyAccountDto } from '../dto'
import { ApiTags } from '@nestjs/swagger'
import { UserDocument } from '@features/user/schemas'

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

  @Post('password')
  @Message('Password reset successfully.')
  public async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.accountService.resetPassword(dto)
  }

  @Put('password')
  @Message('Password updated successfully.')
  public async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @User() user: UserDocument
  ): Promise<void> {
    await this.accountService.updatePassword(dto, user)
  }
}
