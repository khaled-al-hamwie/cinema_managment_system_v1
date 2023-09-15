import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";

@Injectable()
export class TicketsService {
    create(createTicketDto: CreateTicketDto) {
        return "This action adds a new ticket";
    }

    findAll() {
        return `This action returns all tickets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ticket`;
    }
}
