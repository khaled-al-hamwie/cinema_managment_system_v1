import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Movie } from "../movies/entities/movie.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { WatchList } from "./entities/watch-list.entity";
import { WatchListsAction } from "./enums/watch-lists.actions.enum";
import { MovieAlreadyExistInWatchListException } from "./exceptions/movie.already.exist.in.watch.list.exception";
import { WatchListsAbilityFactory } from "./factories/watch-lists.ability.factory";

@Injectable()
export class WatchListsService {
    constructor(
        @InjectRepository(WatchList)
        private watchListRepository: Repository<WatchList>,
        private readonly watchListsAbilityFactory: WatchListsAbilityFactory
    ) {}
    async create(user: User, movie: Movie) {
        await this.checkIfAddedToWatchList(user, movie);
        const watch_list = this.watchListRepository.create();
        watch_list.user = user;
        watch_list.movie = movie;
        this.watchListRepository.save(watch_list);
        return watch_list;
    }

    findOne(options: FindOneOptions<WatchList>) {
        return this.watchListRepository.findOne(options);
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

    async checkIfAddedToWatchList(user: User, movie: Movie) {
        const watch_list = await this.findOne({ where: { user, movie } });
        if (watch_list) throw new MovieAlreadyExistInWatchListException();
    }
}
