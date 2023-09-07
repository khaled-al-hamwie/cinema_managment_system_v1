import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Movie } from "../movies/entities/movie.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./entities/rating.entity";
import { RatingsActions } from "./enums/ratings.actions.enum";
import { RatingAlreadyExistException } from "./exceptions/rating.already.exist.exception";
import { RatingsAbilityFactory } from "./factories/roles.ability.factory";

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

    findAll() {
        return `This action returns all ratings`;
    }

    findOne(options: FindOneOptions<Rating>) {
        return this.ratingsRepository.findOne(options);
    }

    update(id: number, updateRatingDto: UpdateRatingDto) {
        return `This action updates a #${id} rating`;
    }

    remove(id: number) {
        return `This action removes a #${id} rating`;
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
