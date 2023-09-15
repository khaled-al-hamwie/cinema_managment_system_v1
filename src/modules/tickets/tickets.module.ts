import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesSessionsModule } from "../movies-sessions/movies-sessions.module";
import { SeetsModule } from "../seets/seets.module";
import { UsersModule } from "../users/users.module";
import { Ticket } from "./entities/ticket.entity";
import { TicketsAbilityFactory } from "./factories/tickets-ability.factory";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket]),
        UsersModule,
        SeetsModule,
        MoviesSessionsModule,
    ],
    controllers: [TicketsController],
    providers: [TicketsService, TicketsAbilityFactory],
})
export class TicketsModule {}
