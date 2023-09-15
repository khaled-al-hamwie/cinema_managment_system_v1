import { Injectable } from "@nestjs/common";
import {
    And,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    LessThanOrEqual,
    MoreThanOrEqual,
} from "typeorm";
import { FindAllTicketDto } from "../dto/findAll-ticket.dto";
import { Ticket } from "../entities/ticket.entity";

@Injectable()
export class TicketsFindAllProvider {
    private PageLength = 40;
    GetOptions(findAllTicketDto: FindAllTicketDto): FindManyOptions<Ticket> {
        const options: FindManyOptions<Ticket> = {};
        options.where = this.GetWhere(findAllTicketDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder();
        options.take = this.PageLength;
        options.skip = findAllTicketDto.page
            ? findAllTicketDto.page * this.PageLength
            : 0;
        options.relations = this.GetRelation();
        return options;
    }
    private GetWhere({
        created_after,
        created_before,
        movie_id,
        user_id,
    }: FindAllTicketDto):
        | FindOptionsWhere<Ticket>
        | FindOptionsWhere<Ticket>[] {
        const whereOption:
            | FindOptionsWhere<Ticket>
            | FindOptionsWhere<Ticket>[] = {};
        whereOption["user"] = { user_id };
        if (movie_id) whereOption["movie_session"] = { movie: { movie_id } };
        if (created_before)
            whereOption["created_at"] = LessThanOrEqual(
                new Date(created_before)
            );
        if (created_after)
            whereOption["created_at"] = MoreThanOrEqual(
                new Date(created_after)
            );
        if (created_after && created_before)
            whereOption["created_at"] = And(
                MoreThanOrEqual(new Date(created_after)),
                LessThanOrEqual(new Date(created_before))
            );
        return whereOption;
    }
    private GetOrder(): FindOptionsOrder<Ticket> {
        let order: FindOptionsOrder<Ticket> = {};
        order = { created_at: "DESC" };
        return order;
    }

    private GetSelect(): FindOptionsSelect<Ticket> {
        return {
            ticket_id: true,
            created_at: true,
            price: true,
            movie_session: {
                movie_session_id: true,
                name: true,
                duration: true,
                date: true,
                room: { room_id: true, name: true },
                movie: { movie_id: true, title: true },
            },
            seet: { seet_id: true, column_index: true, row_index: true },
        };
    }

    private GetRelation(): FindOptionsRelations<Ticket> {
        return { movie_session: { room: true, movie: true }, seet: true };
    }
}
