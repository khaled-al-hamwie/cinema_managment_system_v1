import {
    IsISO8601,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
} from "class-validator";

export class CreateMoviesSessionDto {
    @IsInt()
    @Min(0)
    movie_id: number;

    @IsInt()
    @Min(0)
    room_id: number;

    @IsString()
    @Length(1, 45)
    name: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    details: string;

    @IsInt()
    @Min(1)
    @Max(500)
    duration: number;

    @IsISO8601()
    date: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0)
    price: number;
}