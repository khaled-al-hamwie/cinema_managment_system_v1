import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SeetsService } from "../seets/seets.service";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { Ticket } from "./entities/ticket.entity";
import { TicketsActions } from "./enums/tickets.actions.enum";
import { TicketsAbilityFactory } from "./factories/tickets-ability.factory";

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket) private TicketRepository: Repository<Ticket>,
        private readonly ticketsAbilityFactory: TicketsAbilityFactory,
        private readonly seetsService: SeetsService
    ) {}
    async create(createTicketDto: CreateTicketDto) {
        delete createTicketDto.movie_session_id;
        delete createTicketDto.seet_id;
        const ticket = this.TicketRepository.create(createTicketDto);
        ticket.price = createTicketDto.movie_session.price;
        this.TicketRepository.save(ticket);
        await this.seetsService.update(createTicketDto.seet, true);
        return ticket;
    }

    findAll() {
        return `This action returns all tickets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ticket`;
    }

    checkAbility(
        action: TicketsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Ticket> | Ticket
    ) {
        const ability = this.ticketsAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
