import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from "typeorm";
import { MovieSession } from "../entities/movies-session.entity";
import { MoviesSessionsActions } from "../enums/movies-sessions.actions.enum";
import { MoviesSessionsAbilityFactory } from "../factories/movies-sessions-ability.factory";

@Injectable()
export class MoviesSessionsFindOneProvider {
    constructor(
        private readonly moviesSessionsAbilityFactory: MoviesSessionsAbilityFactory
    ) {}
    GetOptions(
        MoviesSession_id: number,
        user: UserPayloadInterface
    ): FindOneOptions<MovieSession> {
        const options: FindManyOptions<MovieSession> = {};
        const ability = this.moviesSessionsAbilityFactory
            .createForUser(user)
            .can(MoviesSessionsActions.SeeAllMoviesSession, MovieSession);
        options.where = this.GetWhere(MoviesSession_id);
        options.relations = this.GetRelation(ability);
        options.select = this.GetSelect();
        return options;
    }

    private GetWhere(
        movie_session_id: number
    ): FindOptionsWhere<MovieSession> | FindOptionsWhere<MovieSession>[] {
        const whereOption:
            | FindOptionsWhere<MovieSession>
            | FindOptionsWhere<MovieSession>[] = {
            movie_session_id,
        };
        return whereOption;
    }

    private GetSelect(): FindOptionsSelect<MovieSession> {
        return {
            movie_session_id: true,
            name: true,
            date: true,
            details: true,
            duration: true,
            price: true,
            movie: { movie_id: true, cover_pic: true, title: true },
            tickets: {
                ticket_id: true,
                created_at: true,
                price: true,
                user: {
                    user_id: true,
                    first_name: true,
                    last_name: true,
                    pic: true,
                },
            },
        };
    }

    private GetRelation(ability: boolean): FindOptionsRelations<MovieSession> {
        let relation: FindOptionsRelations<MovieSession> = {};
        if (ability)
            relation = {
                movie: true,
                tickets: { user: true, seet: true },
                room: true,
            };
        else relation = { movie: true, room: true };
        return relation;
    }
}
