import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Item } from "./entities/item.entity";
import { ItemsAbilityFactory } from "./factories/items.ability.factory";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { ItemsFindAllProvider } from "./providers/items.findAll.provider";

@Module({
    imports: [TypeOrmModule.forFeature([Item]), UsersModule],
    controllers: [ItemsController],
    providers: [ItemsService, ItemsAbilityFactory, ItemsFindAllProvider],
})
export class ItemsModule {}
