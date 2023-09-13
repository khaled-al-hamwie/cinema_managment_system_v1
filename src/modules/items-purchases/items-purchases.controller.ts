import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { ItemsService } from "../items/items.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { UsersService } from "../users/users.service";
import { CreateItemsPurchaseDto } from "./dto/create-items-purchase.dto";
import { ItemPurchase } from "./entities/items-purchase.entity";
import { ItemsPurchasesAction } from "./enums/items-purchases.actions.enum";
import { ItemsPurchasesService } from "./items-purchases.service";

@UseGuards(LoggedInGuard)
@Controller("items-purchases")
export class ItemsPurchasesController {
    constructor(
        private readonly itemsPurchasesService: ItemsPurchasesService,
        private readonly itemsService: ItemsService,
        private readonly usersService: UsersService
    ) {}

    @Post()
    async create(
        @Body() createItemsPurchaseDto: CreateItemsPurchaseDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.itemsPurchasesService.checkAbility(
            ItemsPurchasesAction.CreateItemsPurchases,
            user,
            ItemPurchase
        );
        createItemsPurchaseDto.item = await this.itemsService.findById(
            createItemsPurchaseDto.item_id
        );
        createItemsPurchaseDto.user = await this.usersService.findById(
            user.user_id
        );
        return this.itemsPurchasesService.create(createItemsPurchaseDto);
    }

    @Get()
    findMine(@UserDecorator() user: UserPayloadInterface) {
        this.itemsPurchasesService.checkAbility(
            ItemsPurchasesAction.GetItemsPurchases,
            user,
            ItemPurchase
        );
        return this.itemsPurchasesService.findAll({
            where: { user },
            relations: { item: true },
        });
    }

    @Get(":id")
    findForUser(
        @Param("id") user_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.itemsPurchasesService.checkAbility(
            ItemsPurchasesAction.ReadAllItemsPurchases,
            user,
            ItemPurchase
        );
        return this.itemsPurchasesService.findAll({
            where: { user: { user_id } },
            relations: { item: true },
        });
    }
}
