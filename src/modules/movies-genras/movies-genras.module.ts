import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieGenra } from "./entities/movies-genra.entity";
import { MoviesGenrasController } from "./movies-genras.controller";
import { MoviesGenrasService } from "./movies-genras.service";

@Module({
    imports: [TypeOrmModule.forFeature([MovieGenra])],
    controllers: [MoviesGenrasController],
    providers: [MoviesGenrasService],
})
export class MoviesGenrasModule {}
