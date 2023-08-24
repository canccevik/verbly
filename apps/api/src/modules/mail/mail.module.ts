import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailConfigService } from './mail-config.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService
    })
  ]
})
export class MailModule {}
