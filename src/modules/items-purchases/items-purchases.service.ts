import { Injectable } from "@nestjs/common";
import { CreateItemsPurchaseDto } from "./dto/create-items-purchase.dto";
import { UpdateItemsPurchaseDto } from "./dto/update-items-purchase.dto";

@Injectable()
export class ItemsPurchasesService {
    create(createItemsPurchaseDto: CreateItemsPurchaseDto) {
        return "This action adds a new itemsPurchase";
    }

    findAll() {
        return `This action returns all itemsPurchases`;
    }

    findOne(id: number) {
        return `This action returns a #${id} itemsPurchase`;
    }

    update(id: number, updateItemsPurchaseDto: UpdateItemsPurchaseDto) {
        return `This action updates a #${id} itemsPurchase`;
    }

    remove(id: number) {
        return `This action removes a #${id} itemsPurchase`;
    }
}
