import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from "typeorm";
import { FindAllRatingDto } from "../dto/findAll-rating.dto";
import { Rating } from "../entities/rating.entity";

@Injectable()
export class RatingsFindAllProvider {
    private PageLength = 40;
    GetOption(
        findAllRatingsDto: FindAllRatingDto,
        movie_id: number
    ): FindManyOptions<Rating> {
        const options: FindManyOptions<Rating> = {};
        options.select = this.GetSelect();
        options.relations = this.GetRelations();
        options.order = this.GetOrder(findAllRatingsDto);
        options.where = this.GetWhere(movie_id);
        options.take = this.PageLength;
        options.skip = findAllRatingsDto.page
            ? findAllRatingsDto.page * this.PageLength
            : 0;
        return options;
    }

    private GetOrder({ sort }: FindAllRatingDto): FindOptionsOrder<Rating> {
        let order: FindOptionsOrder<Rating> = {};
        if (sort == "newest") order = { created_at: "DESC" };
        else if (sort == "oldest") order = { created_at: "ASC" };
        else order = { created_at: "DESC" };
        return order;
    }

    private GetSelect(): FindOptionsSelect<Rating> {
        return {
            rating_id: true,
            rating: true,
            comment: true,
            created_at: true,
            user: {
                user_id: true,
                first_name: true,
                last_name: true,
                user_name: true,
                pic: true,
            },
        };
    }

    private GetRelations(): FindOptionsRelations<Rating> {
        return { user: true, reactions: true };
    }

    private GetWhere(
        movie_id: number
    ): FindOptionsWhere<Rating> | FindOptionsWhere<Rating>[] {
        const where: FindOptionsWhere<Rating> | FindOptionsWhere<Rating>[] = {};
        where["movie"] = { movie_id };
        return where;
    }

    format(ratings: Rating[]) {
        let like = 0;
        let dislike = 0;
        const formated_rattings = [];
        for (let i = 0; i < ratings.length; i++) {
            const rating = ratings[i];
            like = rating.reactions.filter(
                (reaction) => Number(reaction.value) == 1
            ).length;
            dislike = rating.reactions.filter(
                (reaction) => Number(reaction.value) == -1
            ).length;
            delete rating.reactions;
            formated_rattings.push({ rating, like, dislike });
        }
        return formated_rattings;
    }
}
