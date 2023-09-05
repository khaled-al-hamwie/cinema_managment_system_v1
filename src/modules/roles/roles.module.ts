import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CrewsPositionsModule } from "../crews-positions/crews-positions.module";
import { MoviesModule } from "../movies/movies.module";
import { UsersModule } from "../users/users.module";
import { Role } from "./entities/role.entity";
import { RolesAbilityFactory } from "./factories/roles.ability.factory";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        UsersModule,
        CrewsPositionsModule,
        MoviesModule,
    ],
    controllers: [RolesController],
    providers: [RolesService, RolesAbilityFactory],
})
export class RolesModule {}
