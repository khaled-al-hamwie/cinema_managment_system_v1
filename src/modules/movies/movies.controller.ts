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
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { FindAllMovieDto } from "./dto/findAll-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
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
        @UploadedFiles(new CreateMoviesPipe())
        assets: MoviesAssetsInterface
    ) {
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
    update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(+id, updateMovieDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.moviesService.remove(+id);
    }
}
