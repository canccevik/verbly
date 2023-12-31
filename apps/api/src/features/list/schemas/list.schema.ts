import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import iso from 'iso-639-1'

export type ListDocument = HydratedDocument<List>

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class List {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true
  })
  public ownerId: string

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  })
  public name: string

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return iso.validate(value)
      },
      message: 'word language is not valid'
    }
  })
  public wordLanguage: string

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return iso.validate(value)
      },
      message: 'meaning language is not valid'
    }
  })
  public meaningLanguage: string

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Word', default: [] }]
  })
  public words: Types.ObjectId[]

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 25
  })
  public icon: string

  @Prop({
    type: Boolean,
    default: false
  })
  public isFavorite: boolean
}

export const ListSchema = SchemaFactory.createForClass(List)
