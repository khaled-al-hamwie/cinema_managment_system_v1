import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class FindAllCrewDto {
    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    position_id: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;
}
