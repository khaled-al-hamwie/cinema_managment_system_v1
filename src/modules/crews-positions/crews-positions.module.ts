import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CrewsModule } from "../crews/crews.module";
import { PositionsModule } from "../positions/positions.module";
import { UsersModule } from "../users/users.module";
import { CrewsPositionsController } from "./crews-positions.controller";
import { CrewsPositionsService } from "./crews-positions.service";
import { CrewPosition } from "./entities/crews-position.entity";
import { CrewsPosotionsAbilityFactory } from "./factories/crews-positions.ability.factory";

@Module({
    imports: [
        TypeOrmModule.forFeature([CrewPosition]),
        CrewsModule,
        PositionsModule,
        UsersModule,
    ],
    controllers: [CrewsPositionsController],
    providers: [CrewsPositionsService, CrewsPosotionsAbilityFactory],
    exports: [CrewsPositionsService],
})
export class CrewsPositionsModule {}
