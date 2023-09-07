import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, Min } from "class-validator";

export class FindAllRatingDto {
    @IsOptional()
    @IsIn(["newest", "oldest"])
    sort: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;
}
