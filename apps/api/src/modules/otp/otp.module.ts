import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OTPRepository } from './otp.repository'
import { OTP, OTPSchema } from './otp.schema'
import { OTPService } from './otp.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }])],
  providers: [OTPService, OTPRepository],
  exports: [OTPService]
})
export class OTPModule {}
