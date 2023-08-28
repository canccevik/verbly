import { Body, Controller, Post } from '@nestjs/common'
import { AccountService } from '../services/account.service'
import { Message } from '@core/decorators'
import { VerifyAccountDto } from '../dto'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('verification')
  @Message('Account verified successfully.')
  public async verifyAccount(@Body() dto: VerifyAccountDto): Promise<void> {
    await this.accountService.verifyAccount(dto)
  }
}
