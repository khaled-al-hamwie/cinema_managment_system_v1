import { IsNumber, Min } from "class-validator";
import { Item } from "src/modules/items/entities/item.entity";
import { User } from "src/modules/users/entities/user.entity";

export class CreateItemsPurchaseDto {
    @IsNumber()
    @Min(0)
    item_id: number;

    @IsNumber()
    @Min(0)
    amount: number;

    user: User;
    item: Item;
}
