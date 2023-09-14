import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateMoviesSessionDto } from "./dto/create-movies-session.dto";
import { UpdateMoviesSessionDto } from "./dto/update-movies-session.dto";
import { MovieSession } from "./entities/movies-session.entity";
import { MoviesSessionsActions } from "./enums/movies-sessions.actions.enum";
import { MoviesSessionsAbilityFactory } from "./factories/movies-sessions-ability.factory";

@Injectable()
export class MoviesSessionsService {
    constructor(
        @InjectRepository(MovieSession)
        private readonly movieSessionRepository: Repository<MovieSession>,
        private readonly moviesSessionsAbilityFactory: MoviesSessionsAbilityFactory
    ) {}

    create(createMoviesSessionDto: CreateMoviesSessionDto) {
        delete createMoviesSessionDto.movie_id;
        delete createMoviesSessionDto.room_id;
        const movie_session = this.movieSessionRepository.create(
            createMoviesSessionDto
        );
        this.movieSessionRepository.save(movie_session);
        return movie_session;
    }

    findAll() {
        return `This action returns all moviesSessions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} moviesSession`;
    }

    update(id: number, updateMoviesSessionDto: UpdateMoviesSessionDto) {
        return `This action updates a #${id} moviesSession`;
    }

    remove(id: number) {
        return `This action removes a #${id} moviesSession`;
    }

    checkAbility(
        action: MoviesSessionsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof MovieSession> | MovieSession
    ) {
        const ability = this.moviesSessionsAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
