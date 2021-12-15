import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDTO } from 'src/response.dto';
import { ChatGateway } from 'src/web-socket/chat.gateway';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './room.schema';

@Injectable()
export class RoomService {
  constructor(
    private chatGateway: ChatGateway,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>
  ) { }

  async create(createRoomDto: CreateRoomDto) {
    const newRoom = new this.roomModel(createRoomDto);

    await newRoom.save()
      .then(() => {
        this.chatGateway.alertNewRoom('newRoomCreated', newRoom);
        return {
          message: 'Creating new room',
          data: null,
          status: 'success'
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  async getMyActiveRooms(userName: string) {
    let activeRooms = await this.roomModel.find({$in: {participants: userName}});
    if (activeRooms) {
      let response: ResponseDTO = {
        data: activeRooms,
        message: 'Fetched all active rooms',
        status: 'success'
      };
      return response
    }
    else {
      let response: ResponseDTO = {
        data: null,
        message: 'No active rooms found',
        status: 'fail'
      };
      return response
    }
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
