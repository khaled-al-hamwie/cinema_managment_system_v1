import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesModule } from "../movies/movies.module";
import { RoomsModule } from "../rooms/rooms.module";
import { UsersModule } from "../users/users.module";
import { MovieSession } from "./entities/movies-session.entity";
import { MoviesSessionsAbilityFactory } from "./factories/movies-sessions-ability.factory";
import { MoviesSessionsController } from "./movies-sessions.controller";
import { MoviesSessionsService } from "./movies-sessions.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MovieSession]),
        UsersModule,
        MoviesModule,
        RoomsModule,
    ],
    controllers: [MoviesSessionsController],
    providers: [MoviesSessionsService, MoviesSessionsAbilityFactory],
})
export class MoviesSessionsModule {}
