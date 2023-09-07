import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { UsersService } from "../users/users.service";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAction } from "./enums/watch-lists.actions.enum";
import { WatchListsService } from "./watch-lists.service";

@UseGuards(LoggedInGuard)
@Controller("watch-lists")
export class WatchListsController {
    constructor(
        private readonly watchListsService: WatchListsService,
        private readonly usersService: UsersService,
        private readonly moviesService: MoviesService
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
    get(@UserDecorator() user: UserPayloadInterface) {
        this.watchListsService.checkAbility(
            WatchListsAction.SeeWatchList,
            user,
            WatchList
        );
        return this.watchListsService.findAll();
    }

    @Delete(":id")
    remove(
        @Param("id", ParseIntPipe) watch_list_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.watchListsService.checkAbility(
            WatchListsAction.RemoveFromWatchList,
            user,
            WatchList
        );
        return this.watchListsService.remove(+watch_list_id);
    }
}
