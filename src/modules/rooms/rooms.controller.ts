import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRoomDto } from "./dto/create-room.dto";
import { FindAllRoomDto } from "./dto/findAll-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsActions } from "./enums/rooms.actions.enum";
import { RoomNotFoundException } from "./exceptions/room.not.found.exception";
import { RoomsFindAllProvider } from "./providers/rooms.findAll.provider";
import { RoomsFindOneProvider } from "./providers/rooms.findOne.provider";
import { RoomsService } from "./rooms.service";

@UseGuards(LoggedInGuard)
@Controller("rooms")
export class RoomsController {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly roomsFindAllProvider: RoomsFindAllProvider,
        private readonly roomsFindOneProvider: RoomsFindOneProvider
    ) {}

    @Post()
    create(
        @Body() createRoomDto: CreateRoomDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.CreateRooms, user, Room);
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    async findAll(@Query() findAllRoomDto: FindAllRoomDto) {
        const options = this.roomsFindAllProvider.GetOptions(findAllRoomDto);
        const rooms = await this.roomsService.findAll(options);
        if (rooms.length < 1) throw new RoomNotFoundException();
        return rooms;
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) room_id: number) {
        const options = this.roomsFindOneProvider.GetOptions(room_id);
        const room = await this.roomsService.findOne(options);
        if (!room) throw new RoomNotFoundException();
        return room;
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) room_id: number,
        @Body() updateRoomDto: UpdateRoomDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.UpdateRoom, user, Room);
        const room = await this.roomsService.findById(room_id);
        return this.roomsService.update(room, updateRoomDto);
    }

    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) room_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.DeleteRoom, user, Room);
        const room = await this.roomsService.findById(room_id);
        return this.roomsService.remove(room);
    }
}
