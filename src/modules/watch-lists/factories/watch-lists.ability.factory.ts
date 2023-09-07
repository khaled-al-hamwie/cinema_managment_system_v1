import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { WatchList } from "../entities/watch-list.entity";
import { WatchListsAction } from "../enums/watch-lists.actions.enum";

@Injectable()
export class WatchListsAbilityFactory {
    constructor(private readonly usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            cannot(WatchListsAction.PutInWatchList, WatchList);
            cannot(WatchListsAction.SeeWatchList, WatchList);
            cannot(WatchListsAction.RemoveFromWatchList, WatchList);
        } else {
            can(WatchListsAction.PutInWatchList, WatchList);
            can(WatchListsAction.SeeWatchList, WatchList);
            can(WatchListsAction.RemoveFromWatchList, WatchList);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof WatchList>,
        });
    }
}
