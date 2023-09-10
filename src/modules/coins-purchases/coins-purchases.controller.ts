import { Body, Controller, Get, Post } from "@nestjs/common";
import { CoinsPurchasesService } from "./coins-purchases.service";
import { CreateCoinsPurchaseDto } from "./dto/create-coins-purchase.dto";

@Controller("coins-purchases")
export class CoinsPurchasesController {
    constructor(
        private readonly coinsPurchasesService: CoinsPurchasesService
    ) {}

    @Post()
    create(@Body() createCoinsPurchaseDto: CreateCoinsPurchaseDto) {
        return this.coinsPurchasesService.create(createCoinsPurchaseDto);
    }

    @Get()
    findAll() {
        return this.coinsPurchasesService.findAll();
    }
}
