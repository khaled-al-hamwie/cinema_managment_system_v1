import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateWatchListDto } from "./dto/create-watch-list.dto";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAction } from "./enums/watch-lists.actions.enum";
import { WatchListsAbilityFactory } from "./factories/watch-lists.ability.factory";

@Injectable()
export class WatchListsService {
    constructor(
        private readonly watchListsAbilityFactory: WatchListsAbilityFactory
    ) {}
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

    checkAbility(
        action: WatchListsAction,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof WatchList> | WatchList
    ) {
        const ability = this.watchListsAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
