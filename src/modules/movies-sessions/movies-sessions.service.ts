import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    FindManyOptions,
    FindOneOptions,
    LessThan,
    Not,
    Repository,
} from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateMoviesSessionDto } from "./dto/create-movies-session.dto";
import { UpdateMoviesSessionDto } from "./dto/update-movies-session.dto";
import { MovieSession } from "./entities/movies-session.entity";
import { MoviesSessionsActions } from "./enums/movies-sessions.actions.enum";
import { MovieSessionNotFoundException } from "./exceptions/movie-session.not.found.exception";
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

    findAll(options: FindManyOptions<MovieSession>) {
        return this.movieSessionRepository.find(options);
    }

    findOne(options: FindOneOptions<MovieSession>) {
        return this.movieSessionRepository.findOne(options);
    }

    async findById(movie_session_id: number) {
        const movie_session = await this.findOne({
            where: { movie_session_id, date: Not(LessThan(new Date())) },
        });
        if (!movie_session) throw new MovieSessionNotFoundException();
        return movie_session;
    }

    update(
        movie_session: MovieSession,
        updateMoviesSessionDto: UpdateMoviesSessionDto
    ) {
        this.movieSessionRepository.save({
            ...movie_session,
            ...updateMoviesSessionDto,
        });
        return { message: "movie session has been updated" };
    }

    remove(movie_session: MovieSession) {
        this.movieSessionRepository.softRemove(movie_session);
        return { message: "movie session has been deleted" };
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
