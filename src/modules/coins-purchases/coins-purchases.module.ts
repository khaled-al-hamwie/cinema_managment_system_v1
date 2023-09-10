import { Module } from '@nestjs/common';
import { CoinsPurchasesService } from './coins-purchases.service';
import { CoinsPurchasesController } from './coins-purchases.controller';

@Module({
  controllers: [CoinsPurchasesController],
  providers: [CoinsPurchasesService]
})
export class CoinsPurchasesModule {}
