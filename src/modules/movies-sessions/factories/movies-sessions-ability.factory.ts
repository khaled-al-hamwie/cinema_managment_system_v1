import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { MovieSession } from "../entities/movies-session.entity";
import { MoviesSessionsActions } from "../enums/movies-sessions.actions.enum";

@Injectable()
export class MoviesSessionsAbilityFactory {
    constructor(private readonly usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(MoviesSessionsActions.CreateMoviesSessions, MovieSession);
            can(MoviesSessionsActions.UpdateMoviesSession, MovieSession);
            can(MoviesSessionsActions.DeleteMoviesSession, MovieSession);
        } else {
            cannot(MoviesSessionsActions.CreateMoviesSessions, MovieSession);
            cannot(MoviesSessionsActions.UpdateMoviesSession, MovieSession);
            cannot(MoviesSessionsActions.DeleteMoviesSession, MovieSession);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof MovieSession>,
        });
    }
}
