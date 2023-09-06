import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class MoviesGenraDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    movie_id: number;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    genra_id: number;
}
