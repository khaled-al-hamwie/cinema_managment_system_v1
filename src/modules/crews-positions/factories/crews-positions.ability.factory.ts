import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Crew } from "src/modules/crews/entities/crew.entity";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { CrewsPosotionsActions } from "../enums/crews-positions.actions.enum";

@Injectable()
export class CrewsPosotionsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(CrewsPosotionsActions.PutCrewPosotion, Crew);
            can(CrewsPosotionsActions.DeleteCrewPosotion, Crew);
        } else {
            cannot(CrewsPosotionsActions.PutCrewPosotion, Crew);
            cannot(CrewsPosotionsActions.DeleteCrewPosotion, Crew);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Crew>,
        });
    }
}
