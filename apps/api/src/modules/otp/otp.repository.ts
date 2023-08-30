import { BaseRepository } from '@common/repositories'
import { OTP } from './otp.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class OTPRepository extends BaseRepository<OTP> {
  constructor(@InjectModel(OTP.name) private readonly otpModel: Model<OTP>) {
    super(otpModel)
  }
}
