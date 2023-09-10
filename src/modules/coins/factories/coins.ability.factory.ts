import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Coin } from "../entities/coin.entity";
import { CoinsActions } from "../enums/coins.actions.enum";

@Injectable()
export class CoinsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(CoinsActions.CreateCoin, Coin);
            can(CoinsActions.DeleteCoin, Coin);
        } else {
            cannot(CoinsActions.CreateCoin, Coin);
            cannot(CoinsActions.DeleteCoin, Coin);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Coin>,
        });
    }
}
