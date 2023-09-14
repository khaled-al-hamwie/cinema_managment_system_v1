import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieSession } from "./entities/movies-session.entity";
import { MoviesSessionsController } from "./movies-sessions.controller";
import { MoviesSessionsService } from "./movies-sessions.service";

@Module({
    imports: [TypeOrmModule.forFeature([MovieSession])],
    controllers: [MoviesSessionsController],
    providers: [MoviesSessionsService],
})
export class MoviesSessionsModule {}
