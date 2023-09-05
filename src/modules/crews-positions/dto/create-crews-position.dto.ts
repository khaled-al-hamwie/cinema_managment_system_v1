import { IsInt, Min } from "class-validator";

export class CrewsPositionDto {
    @IsInt()
    @Min(0)
    crew_id: number;

    @IsInt()
    @Min(0)
    position_id: number;
}
