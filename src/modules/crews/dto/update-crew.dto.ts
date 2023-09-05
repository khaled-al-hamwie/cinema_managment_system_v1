import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateCrewDto } from "./create-crew.dto";

export class UpdateCrewDto extends PartialType(
    OmitType(CreateCrewDto, ["pic"])
) {}
