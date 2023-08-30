import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'

export type WordDocument = HydratedDocument<Word>

export enum WordStatus {
  ToBeLearned,
  BeingLearned,
  Learned
}

@Schema({
  versionKey: false,
  timestamps: false
})
export class Word {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true
  })
  public listId: Types.ObjectId

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    match: [/^[A-Za-z]+$/, 'only letters are allowed in the word']
  })
  public word: string

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    match: [/^[A-Za-z]+$/, 'only letters are allowed in the meaning']
  })
  public meaning: string

  @Prop({
    type: String,
    trim: true,
    maxlength: 50,
    match: [/^[A-Za-z]+$/, 'only letters are allowed in the pronunciation']
  })
  public pronunciation: string

  @Prop({
    type: Number,
    required: true,
    enum: WordStatus,
    default: WordStatus.ToBeLearned
  })
  public status: number

  @Prop({
    type: Number,
    required: true
  })
  public order: number
}

export const WordSchema = SchemaFactory.createForClass(Word)
