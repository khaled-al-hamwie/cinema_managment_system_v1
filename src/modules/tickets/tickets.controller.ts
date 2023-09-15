import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { MoviesSessionsService } from "../movies-sessions/movies-sessions.service";
import { SeetsService } from "../seets/seets.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Ticket } from "./entities/ticket.entity";
import { TicketsActions } from "./enums/tickets.actions.enum";
import { TicketsService } from "./tickets.service";

@UseGuards(LoggedInGuard)
@Controller("tickets")
export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
        private readonly seetsService: SeetsService,
        private readonly moviesSessionsService: MoviesSessionsService
    ) {}

    @Post()
    async create(
        @Body() createTicketDto: CreateTicketDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.ticketsService.checkAbility(
            TicketsActions.CreateTickets,
            user,
            Ticket
        );
        const movie_session = await this.moviesSessionsService.findById(
            createTicketDto.movie_session_id
        );
        createTicketDto.movie_session = movie_session;
        createTicketDto.seet = await this.seetsService.findAvailableById(
            createTicketDto.seet_id,
            movie_session.room
        );
        createTicketDto.user = user;
        return this.ticketsService.create(createTicketDto);
    }

    @Get()
    findAll() {
        return this.ticketsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ticketsService.findOne(+id);
    }
}
