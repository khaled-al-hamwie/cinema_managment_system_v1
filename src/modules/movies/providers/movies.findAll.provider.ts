import { Injectable } from "@nestjs/common";
import {
    And,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsSelect,
    FindOptionsWhere,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
} from "typeorm";
import { FindAllMovieDto } from "../dto/findAll-movie.dto";
import { Movie } from "../entities/movie.entity";

@Injectable()
export class MoviesFindAllProvider {
    private PageLength = 20;
    GetOption(findAllMovieDto: FindAllMovieDto): FindManyOptions<Movie> {
        const options: FindManyOptions<Movie> = {};
        options.select = this.GetSelect();
        options.order = this.GetOrder(findAllMovieDto);
        options.where = this.GetWhere(findAllMovieDto);
        options.take = this.PageLength;
        options.skip = findAllMovieDto.page
            ? findAllMovieDto.page * this.PageLength
            : 0;
        return options;
    }

    GetOrder({ sort }: FindAllMovieDto): FindOptionsOrder<Movie> {
        let order: FindOptionsOrder<Movie> = {};
        if (sort == "newest") order = { publish_at: "DESC" };
        else if (sort == "oldest") order = { publish_at: "ASC" };
        else if (sort == "title_ASC") order = { title: "ASC" };
        else if (sort == "title_DESC") order = { title: "DESC" };
        else order = { title: "ASC" };
        return order;
    }

    GetSelect(): FindOptionsSelect<Movie> {
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

    GetWhere({
        title,
        publish_after,
        publish_before,
    }: FindAllMovieDto): FindOptionsWhere<Movie> | FindOptionsWhere<Movie>[] {
        const where: FindOptionsWhere<Movie> | FindOptionsWhere<Movie>[] = {};
        if (title) where["title"] = Like(`%${title}%`);
        if (publish_before)
            where["publish_at"] = LessThanOrEqual(new Date(publish_before));
        if (publish_after)
            where["publish_at"] = MoreThanOrEqual(new Date(publish_after));
        if (publish_after && publish_before)
            where["publish_at"] = And(
                LessThanOrEqual(new Date(publish_before)),
                MoreThanOrEqual(new Date(publish_after))
            );
        return where;
    }
}
