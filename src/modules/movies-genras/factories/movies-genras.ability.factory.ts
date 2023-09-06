import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { MovieGenra } from "../entities/movies-genra.entity";
import { MoviesGenrasAction } from "../enums/movies-genras.actions.enum";

@Injectable()
export class MoviesGenrasAbilityFactory {
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (user.is_admin == true) {
            can(MoviesGenrasAction.PutMoviesGenras, MovieGenra);
            can(MoviesGenrasAction.DeleteMoviesGenras, MovieGenra);
        } else {
            cannot(MoviesGenrasAction.PutMoviesGenras, MovieGenra);
            cannot(MoviesGenrasAction.DeleteMoviesGenras, MovieGenra);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof MovieGenra>,
        });
    }
}
