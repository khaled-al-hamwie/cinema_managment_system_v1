import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { MoviesService } from "../movies/services/movies.service";
import { RoomsService } from "../rooms/rooms.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateMoviesSessionDto } from "./dto/create-movies-session.dto";
import { UpdateMoviesSessionDto } from "./dto/update-movies-session.dto";
import { MovieSession } from "./entities/movies-session.entity";
import { MoviesSessionsActions } from "./enums/movies-sessions.actions.enum";
import { MoviesSessionsService } from "./movies-sessions.service";

@UseGuards(LoggedInGuard)
@Controller("movies-sessions")
export class MoviesSessionsController {
    constructor(
        private readonly moviesSessionsService: MoviesSessionsService,
        private readonly moviesService: MoviesService,
        private readonly roomsService: RoomsService
    ) {}

    @Post()
    async create(
        @Body() createMoviesSessionDto: CreateMoviesSessionDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.moviesSessionsService.checkAbility(
            MoviesSessionsActions.CreateMoviesSessions,
            user,
            MovieSession
        );
        createMoviesSessionDto.movie = await this.moviesService.findById(
            createMoviesSessionDto.movie_id
        );
        createMoviesSessionDto.room = await this.roomsService.findById(
            createMoviesSessionDto.room_id
        );
        return this.moviesSessionsService.create(createMoviesSessionDto);
    }

    @Get()
    findAll() {
        return this.moviesSessionsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.moviesSessionsService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateMoviesSessionDto: UpdateMoviesSessionDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.moviesSessionsService.checkAbility(
            MoviesSessionsActions.UpdateMoviesSession,
            user,
            MovieSession
        );
        return this.moviesSessionsService.update(+id, updateMoviesSessionDto);
    }

    @Delete(":id")
    remove(
        @Param("id") id: string,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.moviesSessionsService.checkAbility(
            MoviesSessionsActions.DeleteMoviesSession,
            user,
            MovieSession
        );
        return this.moviesSessionsService.remove(+id);
    }
}
