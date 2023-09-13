import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ItemsPurchasesService } from "./items-purchases.service";
import { CreateItemsPurchaseDto } from "./dto/create-items-purchase.dto";
import { UpdateItemsPurchaseDto } from "./dto/update-items-purchase.dto";

@Controller("items-purchases")
export class ItemsPurchasesController {
    constructor(
        private readonly itemsPurchasesService: ItemsPurchasesService
    ) {}

    @Post()
    create(@Body() createItemsPurchaseDto: CreateItemsPurchaseDto) {
        return this.itemsPurchasesService.create(createItemsPurchaseDto);
    }

    @Get()
    findAll() {
        return this.itemsPurchasesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.itemsPurchasesService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateItemsPurchaseDto: UpdateItemsPurchaseDto
    ) {
        return this.itemsPurchasesService.update(+id, updateItemsPurchaseDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.itemsPurchasesService.remove(+id);
    }
}
