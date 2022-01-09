import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StudentBioData } from './dto/create-room.dto';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({default: Date.now()})
  timeStamp: number;

  @Prop({required: true})
  participants: StudentBioData[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);