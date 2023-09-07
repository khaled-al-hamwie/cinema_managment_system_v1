import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsController } from "./watch-lists.controller";
import { WatchListsService } from "./watch-lists.service";

@Module({
    imports: [TypeOrmModule.forFeature([WatchList])],
    controllers: [WatchListsController],
    providers: [WatchListsService],
})
export class WatchListsModule {}
