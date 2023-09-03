import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UsersActions } from "../enums/users.actions.enum";
import { UserPayloadInterface } from "../interfaces/user.payload.interface";
import { UsersService } from "../users.service";

@Injectable()
export class UsersAbilityFactory {
    constructor(private readonly usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(UsersActions.SeeUsers, User);
            can(UsersActions.UpdateUser, User, { user_id: user.user_id });
            can(UsersActions.DeleteUser, User, { user_id: user.user_id });
            can(UsersActions.BlockUser, User);
            can(UsersActions.RestoreUser, User);
        } else {
            cannot(UsersActions.SeeUsers, User);
            can(UsersActions.UpdateUser, User, { user_id: user.user_id });
            can(UsersActions.DeleteUser, User, { user_id: user.user_id });
            cannot(UsersActions.BlockUser, User);
            cannot(UsersActions.RestoreUser, User);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof User>,
        });
    }
}
