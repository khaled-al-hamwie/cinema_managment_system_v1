import { Room } from "src/modules/rooms/entities/room.entity";

export class CreateSeetDto {
    column_index: number;
    row_index: number;
    room: Room;
}
