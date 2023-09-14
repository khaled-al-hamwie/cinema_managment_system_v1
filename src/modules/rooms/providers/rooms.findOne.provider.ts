import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from "typeorm";
import { Room } from "../entities/room.entity";

@Injectable()
export class RoomsFindOneProvider {
    GetOptions(room_id: number): FindOneOptions<Room> {
        const options: FindManyOptions<Room> = {};
        options.where = this.GetWhere(room_id);
        options.select = this.GetSelect();
        options.relations = this.GetRelation();
        return options;
    }

    private GetWhere(
        room_id: number
    ): FindOptionsWhere<Room> | FindOptionsWhere<Room>[] {
        const whereOption: FindOptionsWhere<Room> | FindOptionsWhere<Room>[] = {
            room_id,
        };
        return whereOption;
    }

    private GetSelect(): FindOptionsSelect<Room> {
        return {
            room_id: true,
            name: true,
            column_count: true,
            row_count: true,
        };
    }

    private GetRelation(): FindOptionsRelations<Room> {
        return {};
    }
}
