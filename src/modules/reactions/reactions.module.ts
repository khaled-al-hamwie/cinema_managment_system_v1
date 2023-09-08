import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reaction } from "./entities/reaction.entity";
import { ReactionsController } from "./reactions.controller";
import { ReactionsService } from "./reactions.service";

@Module({
    imports: [TypeOrmModule.forFeature([Reaction])],
    controllers: [ReactionsController],
    providers: [ReactionsService],
})
export class ReactionsModule {}
