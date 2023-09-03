import { Injectable } from "@nestjs/common";
import {
    And,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsSelect,
    FindOptionsWhere,
    IsNull,
    LessThanOrEqual,
    Like,
    MoreThanOrEqual,
    Not,
} from "typeorm";
import { FindAllUserDto } from "../dto/findAll-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersFindAllProvider {
    GetOptions(findAllUserDto: FindAllUserDto): FindManyOptions<User> {
        const options: FindManyOptions<User> = {};
        options.where = this.GetWhere(findAllUserDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder(findAllUserDto);
        return options;
    }

    GetWhere({
        first_name,
        last_name,
        user_name,
        only_deleted,
        coins_less_than,
        coins_more_than,
        born_after,
        born_before,
        only_admin,
    }: FindAllUserDto): FindOptionsWhere<User> | FindOptionsWhere<User>[] {
        const whereOption: FindOptionsWhere<User> | FindOptionsWhere<User>[] =
            {};
        whereOption.is_admin = only_admin ? true : false;
        if (first_name) whereOption["first_name"] = Like(first_name);
        if (last_name) whereOption["last_name"] = Like(last_name);
        if (user_name) whereOption["user_name"] = Like(user_name);
        if (only_deleted) whereOption["deleted_at"] = Not(IsNull());
        if (coins_less_than)
            whereOption["coins"] = LessThanOrEqual(coins_less_than);
        if (coins_more_than)
            whereOption["coins"] = MoreThanOrEqual(coins_more_than);
        if (coins_less_than && coins_more_than)
            whereOption["coins"] = And(
                LessThanOrEqual(coins_less_than),
                MoreThanOrEqual(coins_more_than)
            );
        if (born_before)
            whereOption["born_at"] = LessThanOrEqual(new Date(born_before));
        if (born_after)
            whereOption["born_at"] = MoreThanOrEqual(new Date(born_after));
        if (born_after && born_before)
            whereOption["born_at"] = And(
                LessThanOrEqual(new Date(born_before)),
                MoreThanOrEqual(new Date(born_after))
            );
        return whereOption;
    }
    GetOrder({ sort }: FindAllUserDto): FindOptionsOrder<User> {
        let sortOption: FindOptionsOrder<User> = {};
        if (sort == "first_name_ASC") sortOption = { first_name: "ASC" };
        else if (sort == "first_name_DESC") sortOption = { first_name: "DESC" };
        else if (sort == "last_name_ASC") sortOption = { last_name: "ASC" };
        else if (sort == "last_name_DESC") sortOption = { last_name: "DESC" };
        else if (sort == "user_name_ASC") sortOption = { last_name: "ASC" };
        else if (sort == "user_name_DESC") sortOption = { last_name: "DESC" };
        else if (sort == "coins_ASC") sortOption = { last_name: "ASC" };
        else if (sort == "coins_DESC") sortOption = { last_name: "DESC" };
        else sortOption = { first_name: "ASC" };
        return sortOption;
    }

    GetSelect(): FindOptionsSelect<User> {
        return {
            user_id: true,
            user_name: true,
            first_name: true,
            last_name: true,
            born_at: true,
            pic: true,
            coins: true,
            is_admin: true,
        };
    }
}
