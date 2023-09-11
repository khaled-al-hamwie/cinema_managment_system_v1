import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Item } from "../entities/item.entity";
import { ItemsActions } from "../enums/items.actions.enum";

@Injectable()
export class ItemsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(ItemsActions.CreateItem, Item);
            can(ItemsActions.UpdateItem, Item);
            can(ItemsActions.DeleteItem, Item);
        } else {
            cannot(ItemsActions.CreateItem, Item);
            cannot(ItemsActions.UpdateItem, Item);
            cannot(ItemsActions.DeleteItem, Item);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Item>,
        });
    }
}
