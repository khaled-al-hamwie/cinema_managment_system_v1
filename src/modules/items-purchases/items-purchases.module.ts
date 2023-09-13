import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ItemPurchase } from "./entities/items-purchase.entity";
import { ItemsPurchasesAbilityFactory } from "./factories/items-purchases.ability.factory";
import { ItemsPurchasesController } from "./items-purchases.controller";
import { ItemsPurchasesService } from "./items-purchases.service";

@Module({
    imports: [TypeOrmModule.forFeature([ItemPurchase]), UsersModule],
    controllers: [ItemsPurchasesController],
    providers: [ItemsPurchasesService, ItemsPurchasesAbilityFactory],
})
export class ItemsPurchasesModule {}
