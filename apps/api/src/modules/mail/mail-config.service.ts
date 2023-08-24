import { Inject, Injectable } from '@nestjs/common'
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer'
import { Config, ENV } from '@config/index'

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createMailerOptions(): MailerOptions {
    return {
      defaults: {
        from: `Verbly <${this.config.GOOGLE_EMAIL}>`
      },
      transport: {
        service: 'gmail',
        auth: {
          user: this.config.GOOGLE_EMAIL,
          pass: this.config.GOOGLE_PASSWORD
        }
      }
    }
  }
}
