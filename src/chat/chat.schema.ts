import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({default: Date.now()})
  timeStamp: number;

  @Prop()
  roomId: string;

  @Prop({required: true})
  senderId: string;

  @Prop({required: true})
  message: string

  @Prop({})
  senderAvatar: string
}

export const ChatSchema = SchemaFactory.createForClass(Chat);