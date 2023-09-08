import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesModule } from "../movies/movies.module";
import { UsersModule } from "../users/users.module";
import { Rating } from "./entities/rating.entity";
import { RatingsAbilityFactory } from "./factories/ratings.ability.factory";
import { RatingsFindAllProvider } from "./providers/ratings.findAll.provider";
import { RatingsController } from "./ratings.controller";
import { RatingsService } from "./ratings.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rating]), UsersModule, MoviesModule],
    controllers: [RatingsController],
    providers: [RatingsService, RatingsAbilityFactory, RatingsFindAllProvider],
    exports: [RatingsService],
})
export class RatingsModule {}
