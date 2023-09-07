import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";
import { WatchListsService } from "./watch-lists.service";

@Controller("watch-lists")
export class WatchListsController {
    constructor(private readonly watchListsService: WatchListsService) {}

    @Post()
    create(@Body() createWatchListDto: CreateWatchListDto) {
        return this.watchListsService.create(createWatchListDto);
    }

    @Get()
    findAll() {
        return this.watchListsService.findAll();
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.watchListsService.remove(+id);
    }
}
