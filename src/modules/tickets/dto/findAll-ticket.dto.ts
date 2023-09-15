import { Transform } from "class-transformer";
import { IsISO8601, IsInt, IsOptional, Min } from "class-validator";

export class FindAllTicketDto {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    movie_id: number;

    @IsOptional()
    @IsISO8601()
    created_before: Date;

    @IsOptional()
    @IsISO8601()
    created_after: Date;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;

    user_id: number;
}
