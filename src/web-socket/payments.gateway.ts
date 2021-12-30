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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('newPayment')
  async alertNewPayment(@MessageBody() message: any, payment: ReceivePaymentDTO) {
    await this.server.emit(payment.transactionRef, payment)
      .then(
        () => {
          console.log('new payment emitted')
        }
      )
      .catch(
        (error: any) => console.log(error)
      )
  }


}

