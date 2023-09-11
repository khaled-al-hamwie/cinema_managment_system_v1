import { Transform } from "class-transformer";
import {
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";

export class FindAllItemDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    @Min(0.01)
    price_less_than: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
    @Min(0.01)
    price_more_than: number;

    @IsOptional()
    @IsIn(["name_ASC", "name_DESC", "price_ASC", "price_DESC"])
    sort: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;
}
