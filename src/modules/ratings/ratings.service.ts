import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Movie } from "../movies/entities/movie.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./entities/rating.entity";
import { RatingsActions } from "./enums/ratings.actions.enum";
import { RatingAlreadyExistException } from "./exceptions/rating.already.exist.exception";
import { RatingNotFoundException } from "./exceptions/rating.not.found.exception";
import { RatingsAbilityFactory } from "./factories/ratings.ability.factory";

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating) private ratingsRepository: Repository<Rating>,
        private readonly ratingsAbilityProvider: RatingsAbilityFactory
    ) {}
    async create(createRatingDto: CreateRatingDto) {
        await this.checkRatingExists(
            createRatingDto.user,
            createRatingDto.movie
        );
        const rating = this.ratingsRepository.create(createRatingDto);
        this.ratingsRepository.save(rating);
        return rating;
    }

    findAll(options: FindManyOptions<Rating>) {
        return this.ratingsRepository.find(options);
    }

    findOne(options: FindOneOptions<Rating>) {
        return this.ratingsRepository.findOne(options);
    }
    async findById(rating_id: number): Promise<Rating> {
        const rating = await this.findOne({
            where: { rating_id },
            relations: { user: true },
        });
        if (!rating) throw new RatingNotFoundException();
        return rating;
    }

    update(rating: Rating, updateRatingDto: UpdateRatingDto) {
        this.ratingsRepository.save({ ...rating, ...updateRatingDto });
        return { message: "rating has been updated succsesfully" };
    }

    remove(rating: Rating) {
        this.ratingsRepository.softRemove(rating);
        return { message: "rating has been removed succsesfully" };
    }

    checkAbility(
        action: RatingsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Rating> | Rating
    ) {
        const ability = this.ratingsAbilityProvider.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }

    async checkRatingExists(user: UserPayloadInterface, movie: Movie) {
        const rating = await this.findOne({ where: { user, movie } });
        if (rating) throw new RatingAlreadyExistException();
    }
}
