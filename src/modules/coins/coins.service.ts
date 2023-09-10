import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateCoinDto } from "./dto/create-coin.dto";
import { UpdateCoinDto } from "./dto/update-coin.dto";
import { Coin } from "./entities/coin.entity";
import { CoinsActions } from "./enums/coins.actions.enum";
import { CoinsAbilityFactory } from "./factories/coins.ability.factory";

@Injectable()
export class CoinsService {
    constructor(
        @InjectRepository(Coin)
        private readonly coinsRepository: Repository<Coin>,
        private readonly coinsAbilityFactory: CoinsAbilityFactory
    ) {}
    create(createCoinDto: CreateCoinDto) {
        const coin = this.coinsRepository.create(createCoinDto);
        this.coinsRepository.save(coin);
        return coin;
    }

    findOne(options: FindOneOptions<Coin>): Promise<Coin> {
        return this.coinsRepository.findOne(options);
    }

    findAll(options: FindManyOptions<Coin>): Promise<Coin[]> {
        return this.coinsRepository.find(options);
    }

    update(id: number, updateCoinDto: UpdateCoinDto) {
        return `This action updates a #${id} coin`;
    }

    remove(id: number) {
        return `This action removes a #${id} coin`;
    }

    checkAbility(
        action: CoinsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Coin> | Coin
    ) {
        const ability = this.coinsAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
