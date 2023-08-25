import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type OTPDocument = HydratedDocument<OTP>

const FIVE_MINUTES_IN_SECONDS = 60 * 5

@Schema({
  collection: 'otp',
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class OTP {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'email is not valid']
  })
  public email: string

  @Prop({
    type: String,
    required: true,
    uppercase: true,
    trim: true
  })
  public otpCode: string

  @Prop({
    type: Date,
    default: Date.now,
    expires: FIVE_MINUTES_IN_SECONDS
  })
  public createdAt: Date
}

export const OTPSchema = SchemaFactory.createForClass(OTP)
