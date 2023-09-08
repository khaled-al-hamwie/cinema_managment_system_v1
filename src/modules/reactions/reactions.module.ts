import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Reaction } from "./entities/reaction.entity";
import { ReactionsAbilityFactory } from "./factories/reactions.ability.factory";
import { ReactionsController } from "./reactions.controller";
import { ReactionsService } from "./reactions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Reaction]), UsersModule],
    controllers: [ReactionsController],
    providers: [ReactionsService, ReactionsAbilityFactory],
})
export class ReactionsModule {}
