import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
export interface ReceivePaymentDTO {
  paymentAmount: number,
  message: string,
  Status: string,
  transactionRef: string,
  sourceRef: string,
  paymentRef: string,
  paymentChannel: string,
  paymentTimestamp: string
};

@WebSocketGateway({
  cors: ['http://localhost:4200', 'http://localhost:4201',]
})

export class PaymentsGateway {

  @WebSocketServer()
  server;

  @SubscribeMessage('newPayment')
  async alertNewPayment(@MessageBody() message: any, payment: ReceivePaymentDTO) {
    let emitMessage =  this.server.emit(payment.transactionRef, payment)
      if (emitMessage) console.log('emitted message')
      else console.log('could not do shit')
  }
}

