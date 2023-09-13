import { IsInt, Min } from "class-validator";

export class CreateCoinsPurchaseDto {
    @IsInt()
    @Min(0)
    coin_id: number;
}
