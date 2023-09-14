import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsSelect,
    FindOptionsWhere,
    Like,
} from "typeorm";
import { FindAllRoomDto } from "../dto/findAll-room.dto";
import { Room } from "../entities/room.entity";

@Injectable()
export class RoomsFindAllProvider {
    private PageLength = 40;
    GetOptions(findAllRoomDto: FindAllRoomDto): FindManyOptions<Room> {
        const options: FindManyOptions<Room> = {};
        options.where = this.GetWhere(findAllRoomDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder(findAllRoomDto);
        options.take = this.PageLength;
        options.skip = findAllRoomDto.page
            ? findAllRoomDto.page * this.PageLength
            : 0;
        return options;
    }
    private GetWhere({
        name,
    }: FindAllRoomDto): FindOptionsWhere<Room> | FindOptionsWhere<Room>[] {
        const whereOption: FindOptionsWhere<Room> | FindOptionsWhere<Room>[] =
            {};
        if (name) whereOption["name"] = Like(`%${name}%`);
        return whereOption;
    }
    private GetOrder({ sort }: FindAllRoomDto): FindOptionsOrder<Room> {
        let order: FindOptionsOrder<Room> = {};
        if (sort == "name_ASC") order = { name: "ASC" };
        else if (sort == "name_DESC") order = { name: "DESC" };
        else order = { name: "ASC" };
        return order;
    }

    private GetSelect(): FindOptionsSelect<Room> {
        return {
            room_id: true,
            name: true,
            column_count: true,
            row_count: true,
        };
    }
}
