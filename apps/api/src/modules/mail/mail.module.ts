import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailConfigService } from './mail-config.service'
import { MailProcessor } from './mail.processor'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService
    })
  ],
  providers: [MailProcessor]
})
export class MailModule {}
