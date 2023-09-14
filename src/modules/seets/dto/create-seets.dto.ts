import { PickType } from "@nestjs/swagger";
import { CreateRoomDto } from "src/modules/rooms/dto/create-room.dto";
import { Room } from "src/modules/rooms/entities/room.entity";

export class CreateSeetsDto extends PickType(CreateRoomDto, [
    "column_count",
    "row_count",
]) {
    room: Room;
}
