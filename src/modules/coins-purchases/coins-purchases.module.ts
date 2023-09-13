import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StripeModule } from "src/core/stripe/stripe.module";
import { CoinsPurchasesController } from "./coins-purchases.controller";
import { CoinsPurchasesService } from "./coins-purchases.service";
import { CoinPurchase } from "./entities/coins-purchase.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CoinPurchase]),
        StripeModule.forRoot(process.env.STRIPE_KEY, {
            apiVersion: "2023-08-16",
        }),
    ],
    controllers: [CoinsPurchasesController],
    providers: [CoinsPurchasesService],
})
export class CoinsPurchasesModule {}
