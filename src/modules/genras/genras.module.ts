import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Genra } from "./entities/genra.entity";
import { GenrasAbilityFactory } from "./factories/genras.ability.factory";
import { GenrasController } from "./genras.controller";
import { GenrasService } from "./genras.service";

@Module({
    imports: [TypeOrmModule.forFeature([Genra]), UsersModule],
    controllers: [GenrasController],
    providers: [GenrasService, GenrasAbilityFactory],
    exports: [GenrasService],
})
export class GenrasModule {}
