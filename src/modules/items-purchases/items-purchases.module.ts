import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemPurchase } from "./entities/items-purchase.entity";
import { ItemsPurchasesController } from "./items-purchases.controller";
import { ItemsPurchasesService } from "./items-purchases.service";

@Module({
    imports: [TypeOrmModule.forFeature([ItemPurchase])],
    controllers: [ItemsPurchasesController],
    providers: [ItemsPurchasesService],
})
export class ItemsPurchasesModule {}
