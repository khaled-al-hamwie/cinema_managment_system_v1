import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoinsPurchasesController } from "./coins-purchases.controller";
import { CoinsPurchasesService } from "./coins-purchases.service";
import { CoinPurchase } from "./entities/coins-purchase.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CoinPurchase])],
    controllers: [CoinsPurchasesController],
    providers: [CoinsPurchasesService],
})
export class CoinsPurchasesModule {}
