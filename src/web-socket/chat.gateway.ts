import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatDocument } from 'src/chat/chat.schema';
import { Chat } from 'src/chat/entities/chat.entity';
import { ResponseDTO } from 'src/response.dto';
import { Room } from 'src/room/entities/room.entity';

@WebSocketGateway({
  cors: ['http://localhost:4200', 'http://localhost:4201',]
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('newMessage')
  async alertNewMessage(@MessageBody() message: any, chat: ChatDocument) {
    let response: ResponseDTO =  {
      status: 'fail',
      message: 'Could not broadcast message',
      data: null
    };
    let emitMessage = await this.server.emit(chat.roomId, chat)

    if (emitMessage) {
      response =  {
        status: 'success',
        message: 'New Chat',
        data: chat
      }
      return response;
    }
    else {
      response =  {
        status: 'fail',
        message: 'Could not create Room',
        data: null
      }
      return response;
    }
  }

  @SubscribeMessage('newRoomCreated')
  async alertNewRoom(@MessageBody() message: any, room: Room) {
    let response: ResponseDTO =  {
      status: 'fail',
      message: 'Could not broadcast message',
      data: null
    };
    let emitMessage = await this.server.emit('newRoomCreated', room)

    if (emitMessage) {
      response =  {
        status: 'success',
        message: 'New Room Created',
        data: room
      }
      return response;
    }
    else {
      response =  {
        status: 'fail',
        message: 'Could not create Room',
        data: null
      }
      return response;
    }
  }
}
