import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";

export class UpdateRoomDto extends PartialType(
    OmitType(CreateRoomDto, ["column_count", "row_count"])
) {}
