import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "src/modules/ratings/entities/rating.entity";
import { User } from "src/modules/users/entities/user.entity";
import { UserUnauthorizedException } from "src/modules/users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { Movie } from "../entities/movie.entity";
import { MoviesAction } from "../enums/movies.actions.enum";
import { MovieNotFoundException } from "../exceptions/movie.not.found.exception";
import { MoviesAbilityFactory } from "../factories/movies.ability.factory";
import { MoviesUploadAssetsService } from "./movies.upload.assets.service";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        private readonly moviesUploadService: MoviesUploadAssetsService,
        private readonly moviesAbilityProvider: MoviesAbilityFactory
    ) {}
    create(createMovieDto: CreateMovieDto) {
        const pathes = this.moviesUploadService.uploadAssets(
            createMovieDto.assets
        );
        delete createMovieDto.assets;
        const movie = this.moviesRepository.create(createMovieDto);
        movie.cover_pic = pathes.cover_path;
        movie.trailer = pathes.trailer_path;
        movie.movie = pathes.movie_path;
        this.moviesRepository.save(movie);
        return movie;
    }

    findAll(options: FindManyOptions<Movie>) {
        return this.moviesRepository.find(options);
    }

    findOne(options: FindOneOptions<Movie>) {
        return this.moviesRepository.findOne(options);
    }

    getRatings(ratings: Rating[]) {
        if (ratings.length < 1) return 0;
        const sum = ratings.reduce(
            (acc, obj) => Number(acc) + Number(obj.rating),
            0
        );
        return sum / ratings.length;
    }

    async findById(movie_id: number) {
        const movie = await this.findOne({ where: { movie_id } });
        if (!movie) throw new MovieNotFoundException();
        return movie;
    }

    update(movie: Movie, updateMovieDto: UpdateMovieDto) {
        this.moviesRepository.save({ ...movie, ...updateMovieDto });
        return { message: "movie has been updated succsesfully" };
    }

    remove(movie: Movie) {
        this.moviesRepository.softRemove(movie);
        return { message: "movie has been removed succsesfully" };
    }

    checkAbility(
        action: MoviesAction,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Movie> | Movie
    ) {
        const ability = this.moviesAbilityProvider.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
