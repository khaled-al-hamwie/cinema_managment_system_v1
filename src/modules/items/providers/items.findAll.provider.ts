import { Injectable } from "@nestjs/common";
import {
    And,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsSelect,
    FindOptionsWhere,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
} from "typeorm";
import { FindAllItemDto } from "../dto/findAll-item.dto";
import { Item } from "../entities/item.entity";

@Injectable()
export class ItemsFindAllProvider {
    private PageLength = 40;
    GetOptions(findAllItemDto: FindAllItemDto): FindManyOptions<Item> {
        const options: FindManyOptions<Item> = {};
        options.where = this.GetWhere(findAllItemDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder(findAllItemDto);
        options.take = this.PageLength;
        options.skip = findAllItemDto.page
            ? findAllItemDto.page * this.PageLength
            : 0;
        return options;
    }
    private GetWhere({
        name,
        price_less_than,
        price_more_than,
    }: FindAllItemDto): FindOptionsWhere<Item> | FindOptionsWhere<Item>[] {
        const whereOption: FindOptionsWhere<Item> | FindOptionsWhere<Item>[] =
            {};
        if (name) whereOption["name"] = Like(`%${name}%`);
        if (price_less_than)
            whereOption["price"] = LessThanOrEqual(price_less_than);
        if (price_more_than)
            whereOption["price"] = MoreThanOrEqual(price_more_than);
        if (price_less_than && price_more_than)
            whereOption["price"] = And(
                MoreThanOrEqual(price_more_than),
                LessThanOrEqual(price_less_than)
            );
        return whereOption;
    }
    private GetOrder({ sort }: FindAllItemDto): FindOptionsOrder<Item> {
        let order: FindOptionsOrder<Item> = {};
        if (sort == "name_ASC") order = { name: "ASC" };
        else if (sort == "name_DESC") order = { name: "DESC" };
        else if (sort == "price_ASC") order = { price: "ASC" };
        else if (sort == "price_DESC") order = { price: "DESC" };
        else order = { name: "ASC" };
        return order;
    }

    private GetSelect(): FindOptionsSelect<Item> {
        return {
            item_id: true,
            name: true,
            description: true,
            price: true,
        };
    }
}
