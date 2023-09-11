import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./entities/item.entity";
import { ItemsActions } from "./enums/items.actions.enum";
import { ItemNotFoundException } from "./exceptions/item.not.found.exception";
import { ItemsAbilityFactory } from "./factories/items.ability.factory";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
        private readonly itemsAbilityFactory: ItemsAbilityFactory
    ) {}
    create(createItemDto: CreateItemDto) {
        const item = this.itemsRepository.create(createItemDto);
        this.itemsRepository.save(item);
        return item;
    }

    findAll(options: FindManyOptions<Item>): Promise<Item[]> {
        return this.itemsRepository.find(options);
    }

    findOne(options: FindOneOptions<Item>): Promise<Item> {
        return this.itemsRepository.findOne(options);
    }

    update(item: Item, updateItemDto: UpdateItemDto) {
        this.itemsRepository.save({ ...item, ...updateItemDto });
        return { message: "genra has been updated succsesfully" };
    }

    async findById(item_id: number): Promise<Item> {
        const item = await this.findOne({ where: { item_id } });
        if (!item) throw new ItemNotFoundException();
        return item;
    }

    remove(item: Item) {
        this.itemsRepository.softRemove(item);
        return { message: "item has been removed sucssesfuly" };
    }
    checkAbility(
        action: ItemsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Item> | Item
    ) {
        const ability = this.itemsAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
