import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from "typeorm";
import { MovieSession } from "../entities/movies-session.entity";

@Injectable()
export class MoviesSessionsFindOneProvider {
    GetOptions(MoviesSession_id: number): FindOneOptions<MovieSession> {
        const options: FindManyOptions<MovieSession> = {};
        options.where = this.GetWhere(MoviesSession_id);
        options.select = this.GetSelect();
        options.relations = this.GetRelation();
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
        };
    }

    private GetRelation(): FindOptionsRelations<MovieSession> {
        return { movie: true };
    }
}
