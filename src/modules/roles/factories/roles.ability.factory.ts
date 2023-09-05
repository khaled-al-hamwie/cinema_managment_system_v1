import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Role } from "../entities/role.entity";
import { RolesActions } from "../enums/roles.actions.enum";

@Injectable()
export class RolesAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(RolesActions.PutRole, Role);
            can(RolesActions.DeleteRole, Role);
        } else {
            cannot(RolesActions.PutRole, Role);
            cannot(RolesActions.DeleteRole, Role);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Role>,
        });
    }
}
