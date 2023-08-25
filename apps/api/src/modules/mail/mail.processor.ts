import { MailerService } from '@nestjs-modules/mailer'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { MAIL_QUEUE, VERIFICATION } from './mail.constant'

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
      text: `The OTP code is: ${job.data.otpCode}`
    })
  }
}
