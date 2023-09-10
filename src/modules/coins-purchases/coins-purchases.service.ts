import { Injectable } from "@nestjs/common";
import { CreateCoinsPurchaseDto } from "./dto/create-coins-purchase.dto";

@Injectable()
export class CoinsPurchasesService {
    create(createCoinsPurchaseDto: CreateCoinsPurchaseDto) {
        return "This action adds a new coinsPurchase";
    }

    findAll() {
        return `This action returns all coinsPurchases`;
    }

    findOne(id: number) {
        return `This action returns a #${id} coinsPurchase`;
    }
}
