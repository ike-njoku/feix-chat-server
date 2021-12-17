import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({default: Date.now()})
  timeStamp: number;

  @Prop({required: true})
  participants: string[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);