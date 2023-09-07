import { Injectable } from "@nestjs/common";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";

@Injectable()
export class WatchListsService {
    create(createWatchListDto: CreateWatchListDto) {
        return "This action adds a new watchList";
    }

    findAll() {
        return `This action returns all watchLists`;
    }

    findOne(id: number) {
        return `This action returns a #${id} watchList`;
    }

    remove(id: number) {
        return `This action removes a #${id} watchList`;
    }
}
