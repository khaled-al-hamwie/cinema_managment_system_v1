import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Ticket } from "../entities/ticket.entity";
import { TicketsActions } from "../enums/tickets.actions.enum";

@Injectable()
export class TicketsAbilityFactory {
    constructor(private readonly usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            cannot(TicketsActions.CreateTickets, Ticket);
            can(TicketsActions.SeeAllTicket, Ticket);
        } else {
            can(TicketsActions.CreateTickets, Ticket);
            cannot(TicketsActions.SeeAllTicket, Ticket);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Ticket>,
        });
    }
}
