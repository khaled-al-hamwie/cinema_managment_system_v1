import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadModule } from "src/core/uploads/upload.module";
import { CrewsController } from "./crews.controller";
import { CrewsService } from "./crews.service";
import { Crew } from "./entities/crew.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Crew]), UploadModule],
    controllers: [CrewsController],
    providers: [CrewsService],
})
export class CrewsModule {}
