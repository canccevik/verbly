import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import dotenv from 'dotenv'
import iso from 'iso-639-1'

dotenv.config()

export type UserDocument = HydratedDocument<User>

export enum Gender {
  NOT_KNOWN,
  MALE,
  FEMALE,
  NON_BINARY
}

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false,
    createdAt: 'registeredAt'
  }
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9]+$/, 'username is not valid']
  })
  public username: string

  @Prop({
    type: String,
    required: true,
    select: false,
    minlength: 6,
    maxlength: 60,
    trim: true
  })
  public password: string

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'email is not valid']
  })
  public email: string

  @Prop({
    type: Number,
    required: true,
    enum: Gender,
    default: Gender.NOT_KNOWN
  })
  public gender: number

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return iso.validate(value)
      },
      message: 'language code is not valid'
    }
  })
  public nativeLanguage: string

  @Prop({
    type: Boolean,
    required: true,
    default: function () {
      return this.googleId !== undefined
    }
  })
  public isEmailConfirmed: boolean

  @Prop({
    type: String
  })
  public googleId: string

  @Prop({
    type: String,
    required: true,
    default: process.env.DEFAULT_PROFILE_PHOTO,
    match: [/^(https?):\/\/[^\s$.?#].[^\s]*$/gm, 'url is not valid']
  })
  public profilePhoto: string
}

export const UserSchema = SchemaFactory.createForClass(User)
