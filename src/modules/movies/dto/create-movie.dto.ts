import { Transform } from "class-transformer";
import { IsISO8601, IsNumber, IsString, Length, Min } from "class-validator";
import { MoviesAssetsInterface } from "../interfaces/movies.assets.interface";

export class CreateMovieDto {
    @IsString()
    @Length(1, 45)
    title: string;

    @IsString()
    @Length(1, 500)
    story_line: string;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(0)
    duration: number;

    @IsISO8601()
    publish_at: string;

    assets: MoviesAssetsInterface;
}
