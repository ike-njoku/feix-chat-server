import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({default: Date.now()})
  timeStamp: number;

  @Prop({required: true})
  senderId: string;

  @Prop({required: true})
  reveivers: string[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);