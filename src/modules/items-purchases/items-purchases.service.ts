import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateItemsPurchaseDto } from "./dto/create-items-purchase.dto";
import { UpdateItemsPurchaseDto } from "./dto/update-items-purchase.dto";
import { ItemPurchase } from "./entities/items-purchase.entity";
import { ItemsPurchasesAction } from "./enums/items-purchases.actions.enum";
import { ItemsPurchasesAbilityFactory } from "./factories/items-purchases.ability.factory";

@Injectable()
export class ItemsPurchasesService {
    constructor(
        private readonly itemsPurchasesAbilityFactory: ItemsPurchasesAbilityFactory
    ) {}
    create(createItemsPurchaseDto: CreateItemsPurchaseDto) {
        return "This action adds a new itemsPurchase";
    }

    findAll() {
        return `This action returns all itemsPurchases`;
    }

    findOne(id: number) {
        return `This action returns a #${id} itemsPurchase`;
    }

    update(id: number, updateItemsPurchaseDto: UpdateItemsPurchaseDto) {
        return `This action updates a #${id} itemsPurchase`;
    }

    remove(id: number) {
        return `This action removes a #${id} itemsPurchase`;
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
