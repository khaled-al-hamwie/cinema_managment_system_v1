import { Injectable } from "@nestjs/common";
import {
    And,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
} from "typeorm";
import { FindAllMovieSessionDto } from "../dto/findAll-movie-seession.dto";
import { MovieSession } from "../entities/movies-session.entity";

@Injectable()
export class MoviesSessionsFindAllProvider {
    private PageLength = 40;
    GetOptions(
        findAllMovieSessionDto: FindAllMovieSessionDto
    ): FindManyOptions<MovieSession> {
        const options: FindManyOptions<MovieSession> = {};
        options.where = this.GetWhere(findAllMovieSessionDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder(findAllMovieSessionDto);
        options.relations = this.GetRelation();
        options.take = this.PageLength;
        options.skip = findAllMovieSessionDto.page
            ? findAllMovieSessionDto.page * this.PageLength
            : 0;
        return options;
    }
    private GetWhere({
        name,
        date_after,
        movie_id,
        price_less,
    }: FindAllMovieSessionDto):
        | FindOptionsWhere<MovieSession>
        | FindOptionsWhere<MovieSession>[] {
        const whereOption:
            | FindOptionsWhere<MovieSession>
            | FindOptionsWhere<MovieSession>[] = {};
        whereOption["date"] = MoreThanOrEqual(new Date());
        if (name) whereOption["name"] = Like(`%${name}%`);
        if (date_after)
            whereOption["date"] = And(
                MoreThanOrEqual(new Date()),
                LessThanOrEqual(new Date(date_after))
            );
        if (price_less) whereOption["price"] = LessThanOrEqual(price_less);
        if (movie_id) whereOption["movie"] = { movie_id: movie_id };
        return whereOption;
    }
    private GetOrder({
        sort,
    }: FindAllMovieSessionDto): FindOptionsOrder<MovieSession> {
        let order: FindOptionsOrder<MovieSession> = {};
        if (sort == "name_ASC") order = { name: "ASC" };
        else if (sort == "name_DESC") order = { name: "DESC" };
        else order = { name: "ASC" };
        return order;
    }

    private GetSelect(): FindOptionsSelect<MovieSession> {
        return {
            movie_session_id: true,
            name: true,
            date: true,
            details: true,
            price: true,
            movie: { movie_id: true, cover_pic: true, title: true },
        };
    }

    private GetRelation(): FindOptionsRelations<MovieSession> {
        return { movie: true };
    }
}
