import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Rating } from "../entities/rating.entity";
import { RatingsActions } from "../enums/ratings.actions.enum";

@Injectable()
export class RatingsAbilityFactory {
    constructor(private usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            cannot(RatingsActions.CreateRating, Rating);
            cannot(RatingsActions.UpdateRating, Rating);
            can(RatingsActions.DeleteRating, Rating);
        } else {
            can(RatingsActions.CreateRating, Rating);
            can(RatingsActions.UpdateRating, Rating, {
                "user.user_id": user.user_id,
            } as any);
            can(RatingsActions.DeleteRating, Rating, {
                "user.user_id": user.user_id,
            } as any);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Rating>,
        });
    }
}
