import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Chat } from 'src/chat/entities/chat.entity';
import { ResponseDTO } from 'src/response.dto';

@WebSocketGateway({
  cors: ['http://localhost:4200', 'http://localhost:4201',]
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('newMessage')
  async broadcastNewMessage(@MessageBody() message: any, chat: Chat) {
    let response: ResponseDTO =  {
      status: 'fail',
      message: 'Could not broadcast message',
      data: null
    };
    let emitMessage = await this.server.emit('newMessage', chat)

    if (emitMessage) {
      response =  {
        status: 'success',
        message: 'Message has been broadcast',
        data: chat
      }
      console.log(response);
      return response;
    }

    else {
      response =  {
        status: 'fail',
        message: 'Could not broadcast message',
        data: null
      }
      console.log(response);
      return response;
    }
  }
}
