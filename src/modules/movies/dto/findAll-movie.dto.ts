import { Transform } from "class-transformer";
import {
    IsISO8601,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { MoviesSortOptionInterface } from "../interfaces/movies.sort.options.interface";

export class FindAllMovieDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsISO8601()
    publish_before: Date;

    @IsOptional()
    @IsISO8601()
    publish_after: Date;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;

    @IsOptional()
    @IsIn(["newest", "oldest", "title_ASC", "title_DESC"])
    sort: MoviesSortOptionInterface;
}
