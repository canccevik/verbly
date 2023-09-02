import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type FavoriteDocument = HydratedDocument<Favorite>

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class Favorite {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  })
  public userId: string

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'List',
    required: true
  })
  public listId: string
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite)
