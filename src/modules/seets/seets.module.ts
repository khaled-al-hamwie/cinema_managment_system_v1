import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seet } from "./entities/seet.entity";
import { SeetsController } from "./seets.controller";
import { SeetsService } from "./seets.service";

@Module({
    imports: [TypeOrmModule.forFeature([Seet])],
    controllers: [SeetsController],
    providers: [SeetsService],
})
export class SeetsModule {}
