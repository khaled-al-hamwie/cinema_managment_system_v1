import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateItemDto {
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0.01)
    price: number;

    @IsString()
    @Length(1, 45)
    name: string;

    @IsOptional()
    @IsString()
    @Length(5, 500)
    description: string;
}
