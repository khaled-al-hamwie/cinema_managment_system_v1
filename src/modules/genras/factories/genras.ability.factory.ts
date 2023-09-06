import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Genra } from "../entities/genra.entity";
import { GenrasActions } from "../enums/genras.actions.enum";

@Injectable()
export class GenrasAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(GenrasActions.CreateGenra, Genra);
            can(GenrasActions.UpdateGenra, Genra);
            can(GenrasActions.DeleteGenra, Genra);
        } else {
            cannot(GenrasActions.CreateGenra, Genra);
            cannot(GenrasActions.UpdateGenra, Genra);
            cannot(GenrasActions.DeleteGenra, Genra);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Genra>,
        });
    }
}
