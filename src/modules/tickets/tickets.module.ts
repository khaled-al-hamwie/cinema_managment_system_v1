import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Ticket } from "./entities/ticket.entity";
import { TicketsAbilityFactory } from "./factories/tickets-ability.factory";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Module({
    imports: [TypeOrmModule.forFeature([Ticket]), UsersModule],
    controllers: [TicketsController],
    providers: [TicketsService, TicketsAbilityFactory],
})
export class TicketsModule {}
