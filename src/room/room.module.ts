import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room } from './entities/room.entity';
import { RoomSchema } from './room.schema';
import { ChatGateway } from 'src/web-socket/chat.gateway';

@Module({
  controllers: [RoomController],
  providers: [
    RoomService,
    ChatGateway
  ],
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
})
export class RoomModule {}
