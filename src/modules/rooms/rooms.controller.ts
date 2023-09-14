import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsActions } from "./enums/rooms.actions.enum";
import { RoomsService } from "./rooms.service";

@UseGuards(LoggedInGuard)
@Controller("rooms")
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Post()
    create(
        @Body() createRoomDto: CreateRoomDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.CreateRooms, user, Room);
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    findAll() {
        return this.roomsService.findAll({});
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) room_id: number) {
        return this.roomsService.findOne({});
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
