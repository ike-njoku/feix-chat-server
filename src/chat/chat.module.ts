import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
})
export class ChatModule {}
