import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { Movie } from "../entities/movie.entity";
import { MoviesAction } from "../enums/movies.actions.enum";

@Injectable()
export class MoviesAbilityFactory {
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (user.is_admin == true) {
            can(MoviesAction.CreateMovie, Movie);
            can(MoviesAction.UpdateMovie, Movie);
            can(MoviesAction.DeleteMovie, Movie);
        } else {
            cannot(MoviesAction.CreateMovie, Movie);
            cannot(MoviesAction.UpdateMovie, Movie);
            cannot(MoviesAction.DeleteMovie, Movie);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Movie>,
        });
    }
}
