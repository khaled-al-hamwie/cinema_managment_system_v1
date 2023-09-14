import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class FindAllRoomDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsIn(["name_ASC", "name_DESC"])
    sort: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;
}
