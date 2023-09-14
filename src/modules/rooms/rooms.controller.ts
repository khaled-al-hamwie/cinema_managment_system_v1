import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
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
    findOne(@Param("id") id: string) {
        return this.roomsService.findOne({});
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateRoomDto: UpdateRoomDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.UpdateRoom, user, Room);
        return this.roomsService.update(+id, updateRoomDto);
    }

    @Delete(":id")
    remove(
        @Param("id") id: string,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.roomsService.checkAbility(RoomsActions.DeleteRoom, user, Room);
        return this.roomsService.remove(+id);
    }
}
