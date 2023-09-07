import { Transform } from "class-transformer";
import {
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
} from "class-validator";
import { Movie } from "src/modules/movies/entities/movie.entity";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";

export class CreateRatingDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    movie_id: number;

    @IsNumber({ maxDecimalPlaces: 1, allowNaN: false, allowInfinity: false })
    @Min(0.0)
    @Max(10.0)
    rating: number;

    @IsOptional()
    @IsString()
    @Length(1, 2000)
    comment: string;

    user: UserPayloadInterface;
    movie: Movie;
}
