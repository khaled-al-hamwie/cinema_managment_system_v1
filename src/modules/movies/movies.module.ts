import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadModule } from "src/core/uploads/upload.module";
import { Movie } from "./entities/movie.entity";
import { MoviesController } from "./movies.controller";
import { MoviesFindAllProvider } from "./providers/movies.findAll.provider";
import { MoviesService } from "./services/movies.service";
import { MoviesUploadAssetsService } from "./services/movies.upload.assets.service";

@Module({
    imports: [TypeOrmModule.forFeature([Movie]), UploadModule],
    controllers: [MoviesController],
    providers: [
        MoviesService,
        MoviesUploadAssetsService,
        MoviesFindAllProvider,
    ],
})
export class MoviesModule {}
