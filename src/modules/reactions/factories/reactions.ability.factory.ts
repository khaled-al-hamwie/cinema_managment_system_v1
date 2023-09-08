import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Reaction } from "../entities/reaction.entity";
import { ReactionsActions } from "../enums/reactions.actions.enum";

@Injectable()
export class ReactionsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            cannot(ReactionsActions.AddReaction, Reaction);
        } else {
            can(ReactionsActions.AddReaction, Reaction);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Reaction>,
        });
    }
}
