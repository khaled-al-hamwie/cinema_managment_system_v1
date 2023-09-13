import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { UsersService } from "../users/users.service";
import { CreateItemsPurchaseDto } from "./dto/create-items-purchase.dto";
import { ItemPurchase } from "./entities/items-purchase.entity";
import { ItemsPurchasesAction } from "./enums/items-purchases.actions.enum";
import { NoEnoughMoneyException } from "./exceptions/no.enouph.money.exception";
import { ItemsPurchasesAbilityFactory } from "./factories/items-purchases.ability.factory";

@Injectable()
export class ItemsPurchasesService {
    constructor(
        @InjectRepository(ItemPurchase)
        private readonly itemPurchaseRepository: Repository<ItemPurchase>,
        private readonly itemsPurchasesAbilityFactory: ItemsPurchasesAbilityFactory,
        private readonly usersService: UsersService
    ) {}
    async create({ item, user, amount }: CreateItemsPurchaseDto) {
        if (item.price > user.coins) throw new NoEnoughMoneyException();
        const item_purchase = this.itemPurchaseRepository.create({
            item,
            user,
            price: item.price,
            amount,
        });
        await this.usersService.updateCoins(user, -item.price);
        this.itemPurchaseRepository.save(item_purchase);
        return item_purchase;
    }

    findAll(options: FindManyOptions<ItemPurchase>) {
        return this.itemPurchaseRepository.find(options);
    }

    checkAbility(
        action: ItemsPurchasesAction,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof ItemPurchase> | ItemPurchase
    ) {
        const ability = this.itemsPurchasesAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
