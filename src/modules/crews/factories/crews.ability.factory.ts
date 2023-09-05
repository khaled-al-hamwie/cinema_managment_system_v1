import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Crew } from "../entities/crew.entity";
import { CrewsActions } from "../enums/crews.actions.enum";

@Injectable()
export class CrewsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(CrewsActions.CreateCrew, Crew);
            can(CrewsActions.UpdateCrew, Crew);
            can(CrewsActions.DeleteCrew, Crew);
        } else {
            cannot(CrewsActions.CreateCrew, Crew);
            cannot(CrewsActions.UpdateCrew, Crew);
            cannot(CrewsActions.DeleteCrew, Crew);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Crew>,
        });
    }
}
