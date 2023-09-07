import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesModule } from "../movies/movies.module";
import { UsersModule } from "../users/users.module";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAbilityFactory } from "./factories/watch-lists.ability.factory";
import { WatchListsController } from "./watch-lists.controller";
import { WatchListsService } from "./watch-lists.service";

@Module({
    imports: [TypeOrmModule.forFeature([WatchList]), UsersModule, MoviesModule],
    controllers: [WatchListsController],
    providers: [WatchListsService, WatchListsAbilityFactory],
})
export class WatchListsModule {}
