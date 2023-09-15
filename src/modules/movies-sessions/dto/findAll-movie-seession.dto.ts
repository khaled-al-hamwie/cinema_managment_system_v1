import { Transform } from "class-transformer";
import {
    IsISO8601,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { IsFutureDate } from "src/core/validators/is.future.validator";

export class FindAllMovieSessionDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsISO8601()
    @IsFutureDate()
    date_after: Date;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    @Min(0.01)
    price_less: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    movie_id: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;

    @IsOptional()
    @IsIn(["newest", "oldest", "name_ASC", "name_DESC"])
    sort: string;
}
