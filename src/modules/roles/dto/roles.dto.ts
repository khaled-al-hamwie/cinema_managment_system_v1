import { IsInt, Min } from "class-validator";

export class RolesDto {
    @IsInt()
    @Min(0)
    crew_id: number;

    @IsInt()
    @Min(0)
    position_id: number;

    @IsInt()
    @Min(0)
    movie_id: number;
}
