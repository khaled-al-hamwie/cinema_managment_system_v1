import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seet } from "./entities/seet.entity";
import { SeetsService } from "./seets.service";

@Module({
    imports: [TypeOrmModule.forFeature([Seet])],
    providers: [SeetsService],
    exports: [SeetsService],
})
export class SeetsModule {}
