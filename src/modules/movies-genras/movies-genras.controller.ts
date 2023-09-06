import { Body, Controller, Delete, Put, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { GenrasService } from "../genras/genras.service";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { MoviesGenraDto } from "./dto/movies-genra.dto";
import { MovieGenra } from "./entities/movies-genra.entity";
import { MoviesGenrasAction } from "./enums/movies-genras.actions.enum";
import { MovieGenraNotFoundException } from "./exceptions/movie-genra.not.found.exception";
import { MoviesGenrasService } from "./movies-genras.service";

@UseGuards(LoggedInGuard)
@Controller("movies-genras")
export class MoviesGenrasController {
    constructor(
        private readonly moviesGenrasService: MoviesGenrasService,
        private readonly moviesService: MoviesService,
        private readonly genraService: GenrasService
    ) {}

    @Put()
    async create(
        @Body() { movie_id, genra_id }: MoviesGenraDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.moviesGenrasService.checkAbility(
            MoviesGenrasAction.PutMoviesGenras,
            user,
            MovieGenra
        );
        const genra = await this.genraService.findById(genra_id);
        const movie = await this.moviesService.findById(movie_id);
        return this.moviesGenrasService.put(movie, genra);
    }

    @Delete()
    async remove(
        @Body() { movie_id, genra_id }: MoviesGenraDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.moviesGenrasService.checkAbility(
            MoviesGenrasAction.PutMoviesGenras,
            user,
            MovieGenra
        );
        const genra = await this.genraService.findById(genra_id);
        const movie = await this.moviesService.findById(movie_id);
        const movie_genra = await this.moviesGenrasService.findOne({
            where: { genra, movie },
        });
        if (!movie_genra) throw new MovieGenraNotFoundException();
        return this.moviesGenrasService.remove(movie_genra);
    }
}
