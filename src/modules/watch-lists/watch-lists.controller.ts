import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { FindAllMovieDto } from "../movies/dto/findAll-movie.dto";
import { MoviesFindAllProvider } from "../movies/providers/movies.findAll.provider";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { UsersService } from "../users/users.service";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAction } from "./enums/watch-lists.actions.enum";
import { WatchListNotFoundException } from "./exceptions/watch-list.not.found.exception";
import { WatchListsService } from "./watch-lists.service";

@UseGuards(LoggedInGuard)
@Controller("watch-lists")
export class WatchListsController {
    constructor(
        private readonly watchListsService: WatchListsService,
        private readonly usersService: UsersService,
        private readonly moviesService: MoviesService,
        private readonly moviesFindAllProvider: MoviesFindAllProvider
    ) {}

    @Put()
    async put(
        @Body() { movie_id }: CreateWatchListDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.watchListsService.checkAbility(
            WatchListsAction.PutInWatchList,
            user,
            WatchList
        );
        const my_user = await this.usersService.findOne({
            where: { user_id: user.user_id },
        });
        const movie = await this.moviesService.findById(movie_id);
        return this.watchListsService.create(my_user, movie);
    }

    @Get()
    async get(
        @Query() findAllMovieDto: FindAllMovieDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.watchListsService.checkAbility(
            WatchListsAction.SeeWatchList,
            user,
            WatchList
        );
        const options = this.moviesFindAllProvider.GetOption(
            findAllMovieDto,
            user
        );
        const watch_list = await this.moviesService.findAll(options);
        if (watch_list.length < 1) throw new WatchListNotFoundException();
        return watch_list;
    }

    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) movie_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.watchListsService.checkAbility(
            WatchListsAction.RemoveFromWatchList,
            user,
            WatchList
        );
        const watch_list = await this.watchListsService.findOne({
            where: { movie: { movie_id }, user },
        });
        if (!watch_list) throw new WatchListNotFoundException();
        return this.watchListsService.remove(watch_list);
    }
}
