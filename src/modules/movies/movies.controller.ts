import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesInterceptor } from "./interceptors/movies.interceptor";
import { MoviesAssetsInterface } from "./interfaces/movies.assets.interface";
import { CreateMoviesPipe } from "./pipes/create-movies.pipe";
import { MoviesService } from "./services/movies.service";

@Controller("movies")
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

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
    findAll() {
        return this.moviesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.moviesService.findOne(+id);
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
