import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsGateway } from 'src/web-socket/payments.gateway';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsGateway
  ]
})
export class PaymentsModule {}
