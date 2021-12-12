import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { WebSocketModule } from './web-socket/web-socket.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ChatModule,
    MongooseModule.forRoot(
      'mongodb://localhost/fenix-sms-chat-server'
      ),
    WebSocketModule,
  ],
})
export class AppModule {}
