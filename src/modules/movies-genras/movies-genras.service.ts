import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Genra } from "../genras/entities/genra.entity";
import { Movie } from "../movies/entities/movie.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { MovieGenra } from "./entities/movies-genra.entity";
import { MoviesGenrasAction } from "./enums/movies-genras.actions.enum";
import { MovieGenraAlreadyExistException } from "./exceptions/movie-genra.already.exist.exception";
import { MoviesGenrasAbilityFactory } from "./factories/movies-genras.ability.factory";

@Injectable()
export class MoviesGenrasService {
    constructor(
        @InjectRepository(MovieGenra)
        private readonly movieGenraRepository: Repository<MovieGenra>,
        private readonly moviesGenrasAbilityFactory: MoviesGenrasAbilityFactory
    ) {}
    async put(movie: Movie, genra: Genra) {
        await this.checkAlradyExist(movie, genra);
        const movie_genra = this.movieGenraRepository.create();
        movie_genra.genra = genra;
        movie_genra.movie = movie;
        this.movieGenraRepository.save(movie_genra);
        return movie_genra;
    }

    findOne(options: FindOneOptions<MovieGenra>) {
        return this.movieGenraRepository.findOne(options);
    }

    remove(id: number) {
        return `This action removes a #${id} moviesGenra`;
    }

    checkAbility(
        action: MoviesGenrasAction,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof MovieGenra> | MovieGenra
    ) {
        const ability = this.moviesGenrasAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }

    async checkAlradyExist(movie: Movie, genra: Genra) {
        const movie_genra = await this.findOne({ where: { movie, genra } });
        if (movie_genra) throw new MovieGenraAlreadyExistException();
    }
}
