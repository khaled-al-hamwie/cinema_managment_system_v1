import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { FindAllMovieDto } from "./dto/findAll-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entity";
import { MoviesAction } from "./enums/movies.actions.enum";
import { MovieNotFoundException } from "./exceptions/movie.not.found.exception";
import { MoviesInterceptor } from "./interceptors/movies.interceptor";
import { MoviesAssetsInterface } from "./interfaces/movies.assets.interface";
import { CreateMoviesPipe } from "./pipes/create-movies.pipe";
import { MoviesFindAllProvider } from "./providers/movies.findAll.provider";
import { MoviesFindOneProvider } from "./providers/movies.findOne.provider";
import { MoviesService } from "./services/movies.service";

@Controller("movies")
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService,
        private readonly moviesFindAllProvider: MoviesFindAllProvider,
        private readonly moviesFindOneProvider: MoviesFindOneProvider
    ) {}

    @UseGuards(LoggedInGuard)
    @UseInterceptors(MoviesInterceptor)
    @Post()
    create(
        @Body() createMovieDto: CreateMovieDto,
        @UserDecorator() user: UserPayloadInterface,
        @UploadedFiles(new CreateMoviesPipe())
        assets: MoviesAssetsInterface
    ) {
        this.moviesService.checkAbility(MoviesAction.CreateMovie, user, Movie);
        createMovieDto.assets = assets;
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    async findAll(@Query() findAllMovieDto: FindAllMovieDto) {
        const options = this.moviesFindAllProvider.GetOption(findAllMovieDto);
        const movies = await this.moviesService.findAll(options);
        if (movies.length < 1) throw new MovieNotFoundException();
        return movies;
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) movie_id: number) {
        const options = this.moviesFindOneProvider.GetOption(movie_id);
        const movie = await this.moviesService.findOne(options);
        if (!movie) throw new MovieNotFoundException();
        return movie;
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) movie_id: number,
        @Body() updateMovieDto: UpdateMovieDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const movie = await this.moviesService.findOne({ where: { movie_id } });
        if (!movie) throw new MovieNotFoundException();
        this.moviesService.checkAbility(MoviesAction.UpdateMovie, user, movie);

        return this.moviesService.update(movie, updateMovieDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    async remove(
        @Param("id") movie_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const movie = await this.moviesService.findOne({ where: { movie_id } });
        if (!movie) throw new MovieNotFoundException();
        this.moviesService.checkAbility(MoviesAction.DeleteMovie, user, movie);
        return this.moviesService.remove(movie);
    }
}
