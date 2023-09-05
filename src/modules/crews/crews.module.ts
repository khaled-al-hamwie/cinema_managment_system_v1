import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadModule } from "src/core/uploads/upload.module";
import { UsersModule } from "../users/users.module";
import { CrewsController } from "./crews.controller";
import { CrewsService } from "./crews.service";
import { Crew } from "./entities/crew.entity";
import { CrewsAbilityFactory } from "./factories/crews.ability.factory";
import { CrewsFindAllProvider } from "./providers/crews.findAll.provider";
import { CrewsFindOneProvider } from "./providers/crews.findOne.provider";

@Module({
    imports: [TypeOrmModule.forFeature([Crew]), UploadModule, UsersModule],
    controllers: [CrewsController],
    providers: [
        CrewsService,
        CrewsAbilityFactory,
        CrewsFindOneProvider,
        CrewsFindAllProvider,
    ],
})
export class CrewsModule {}
