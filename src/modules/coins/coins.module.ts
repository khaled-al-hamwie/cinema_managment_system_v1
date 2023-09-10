import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { CoinsController } from "./coins.controller";
import { CoinsService } from "./coins.service";
import { Coin } from "./entities/coin.entity";
import { CoinsAbilityFactory } from "./factories/coins.ability.factory";

@Module({
    imports: [TypeOrmModule.forFeature([Coin]), UsersModule],
    controllers: [CoinsController],
    providers: [CoinsService, CoinsAbilityFactory],
})
export class CoinsModule {}
