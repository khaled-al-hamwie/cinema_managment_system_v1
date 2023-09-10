import { IsNumber, Min } from "class-validator";

export class CreateCoinDto {
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0.01)
    price: number;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(0.01)
    amount: number;
}
