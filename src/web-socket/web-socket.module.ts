import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PaymentsGateway } from './payments.gateway';

@Module({
  providers: [ChatGateway, PaymentsGateway]
})
export class WebSocketModule {}
