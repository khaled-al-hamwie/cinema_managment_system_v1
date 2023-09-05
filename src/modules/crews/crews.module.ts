import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadModule } from "src/core/uploads/upload.module";
import { UsersModule } from "../users/users.module";
import { CrewsController } from "./crews.controller";
import { CrewsService } from "./crews.service";
import { Crew } from "./entities/crew.entity";
import { CrewsAbilityFactory } from "./factories/crews.ability.factory";

@Module({
    imports: [TypeOrmModule.forFeature([Crew]), UploadModule, UsersModule],
    controllers: [CrewsController],
    providers: [CrewsService, CrewsAbilityFactory],
})
export class CrewsModule {}
