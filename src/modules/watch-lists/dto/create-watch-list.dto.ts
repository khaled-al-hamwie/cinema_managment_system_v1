import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreateWatchListDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    movie_id: number;
}
