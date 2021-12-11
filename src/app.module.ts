import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ChatModule],
})
export class AppModule {}
