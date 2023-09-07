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
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAction } from "./enums/watch-lists.actions.enum";
import { WatchListsService } from "./watch-lists.service";

@UseGuards(LoggedInGuard)
@Controller("watch-lists")
export class WatchListsController {
    constructor(private readonly watchListsService: WatchListsService) {}

    @Put()
    put(
        @Body() createWatchListDto: CreateWatchListDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.watchListsService.checkAbility(
            WatchListsAction.PutInWatchList,
            user,
            WatchList
        );
        return this.watchListsService.create(createWatchListDto);
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
