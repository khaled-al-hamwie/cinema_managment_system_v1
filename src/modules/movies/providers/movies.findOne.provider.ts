import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsSelect,
    FindOptionsWhere,
} from "typeorm";
import { Movie } from "../entities/movie.entity";

@Injectable()
export class MoviesFindOneProvider {
    GetOption(movie_id: number): FindOneOptions<Movie> {
        const options: FindManyOptions<Movie> = {};
        options.select = this.GetSelect();
        options.where = this.GetWhere(movie_id);
        return options;
    }

    private GetSelect(): FindOptionsSelect<Movie> {
        return {
            movie_id: true,
            title: true,
            story_line: true,
            duration: true,
            publish_at: true,
            cover_pic: true,
            trailer: true,
            movie: true,
        };
    }

    private GetWhere(
        movie_id: number
    ): FindOptionsWhere<Movie> | FindOptionsWhere<Movie>[] {
        const where: FindOptionsWhere<Movie> | FindOptionsWhere<Movie>[] = {};
        where["movie_id"] = movie_id;
        return where;
    }
}
