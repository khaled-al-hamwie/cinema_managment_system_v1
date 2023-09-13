import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { ItemPurchase } from "../entities/items-purchase.entity";
import { ItemsPurchasesAction } from "../enums/items-purchases.actions.enum";

@Injectable()
export class ItemsPurchasesAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            cannot(ItemsPurchasesAction.CreateItemsPurchases, ItemPurchase);
            cannot(ItemsPurchasesAction.GetItemsPurchases, ItemPurchase);
            can(ItemsPurchasesAction.ReadAllItemsPurchases, ItemPurchase);
        } else {
            can(ItemsPurchasesAction.CreateItemsPurchases, ItemPurchase);
            can(ItemsPurchasesAction.GetItemsPurchases, ItemPurchase);
            cannot(ItemsPurchasesAction.ReadAllItemsPurchases, ItemPurchase);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof ItemPurchase>,
        });
    }
}
