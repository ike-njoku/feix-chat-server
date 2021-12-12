import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDTO } from 'src/response.dto';
import { ChatGateway } from 'src/web-socket/chat.gateway';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {

  constructor(
    private chatGateway: ChatGateway,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>
    ) {}

  async create(createChatDto: CreateChatDto)  {
    console.log('saving message')
    let response: ResponseDTO = {
      message: 'Could not send message',
      data: null,
      status: 'fail'
    }
    let newMessage = new this.chatModel(createChatDto);
    await newMessage.save()
      .then(() => {
        this.broadcastChat('newMessage', newMessage)
        response.data = newMessage;
        response.message = 'Message saved, awaiting broadcast';
        response.status = 'success';
        return response
      })
      .catch(
      (error: any) => {
        let response = {
          message: 'Message could not be sent',
          data: error,
          status: 'fail'
        }
        return response;
      })

  }

  async broadcastChat(listener: string, chat: any) {
    await this.chatGateway.broadcastNewMessage(listener, chat)
      .then(() => {
        let response: ResponseDTO = {
          message: 'Message Sent',
          data: chat,
          status: 'success'
        }
        return response
      })
      .catch((error) => {
        let response: ResponseDTO = {
          message: 'Message could not be Sent',
          data: error,
          status: 'fail'
        }
        return response
      })
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
