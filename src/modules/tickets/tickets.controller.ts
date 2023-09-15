import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketsService } from "./tickets.service";

@UseGuards(LoggedInGuard)
@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    create(@Body() createTicketDto: CreateTicketDto) {
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
