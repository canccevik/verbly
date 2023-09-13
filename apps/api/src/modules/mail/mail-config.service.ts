import { Inject, Injectable } from '@nestjs/common'
import { MailerOptionsFactory, MailerOptions } from '@nestjs-modules/mailer'
import { Config, ENV } from '@config/index'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

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
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter()
      }
    }
  }
}
