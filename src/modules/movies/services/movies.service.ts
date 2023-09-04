import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { Movie } from "../entities/movie.entity";
import { MoviesUploadAssetsService } from "./movies.upload.assets.service";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
        private readonly moviesUploadService: MoviesUploadAssetsService
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

    update(id: number, updateMovieDto: UpdateMovieDto) {
        return `This action updates a #${id} movie`;
    }

    remove(id: number) {
        return `This action removes a #${id} movie`;
    }
}
