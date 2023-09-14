import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @Length(1, 45)
    name: string;

    @IsNumber()
    @Min(0)
    row_count: number;

    @IsNumber()
    @Min(0)
    column_count: number;
}
