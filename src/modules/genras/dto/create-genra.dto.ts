import { Transform } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateGenraDto {
    @IsString()
    @Transform(({ value }) => String(value).trim().toLowerCase())
    @Length(1, 20)
    title: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    description: string;
}
