import { MailerService } from '@nestjs-modules/mailer'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { MAIL_QUEUE, RESET_PASSWORD, VERIFICATION } from './mail.constant'

@Processor(MAIL_QUEUE)
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process(VERIFICATION)
  public async sendVerificationOTPCode(
    job: Job<{ email: string; otpCode: string }>
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: job.data.email,
      subject: 'Welcome to Verbly! Verify your account',
      template: 'verification',
      context: {
        otpCode: job.data.otpCode
      }
    })
  }

  @Process(RESET_PASSWORD)
  public async sendResetPasswordCode(
    job: Job<{ email: string; redirectUrl: string }>
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: job.data.email,
      subject: 'Reset your password',
      template: 'reset-password',
      context: {
        resetLink: job.data.redirectUrl
      }
    })
  }
}
