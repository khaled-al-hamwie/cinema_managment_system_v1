import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenrasModule } from "../genras/genras.module";
import { MoviesModule } from "../movies/movies.module";
import { UsersModule } from "../users/users.module";
import { MovieGenra } from "./entities/movies-genra.entity";
import { MoviesGenrasAbilityFactory } from "./factories/movies-genras.ability.factory";
import { MoviesGenrasController } from "./movies-genras.controller";
import { MoviesGenrasService } from "./movies-genras.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MovieGenra]),
        UsersModule,
        GenrasModule,
        MoviesModule,
    ],
    controllers: [MoviesGenrasController],
    providers: [MoviesGenrasService, MoviesGenrasAbilityFactory],
})
export class MoviesGenrasModule {}
