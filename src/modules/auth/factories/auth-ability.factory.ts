import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/entities/user.entity";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { AuthAction } from "../enums/auth.actions.enum";

@Injectable()
export class AuthAbilityFactory {
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (user.is_admin == true) {
            can(AuthAction.RegisterAdmin, User);
        } else {
            cannot(AuthAction.RegisterAdmin, User);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof User>,
        });
    }
}
