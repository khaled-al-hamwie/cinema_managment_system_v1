import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./entities/item.entity";
import { ItemsActions } from "./enums/items.actions.enum";
import { ItemNotFoundException } from "./exceptions/item.not.found.exception";
import { ItemsService } from "./items.service";

@Controller("items")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @UseGuards(LoggedInGuard)
    @Post()
    create(
        @Body() createItemDto: CreateItemDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.itemsService.checkAbility(ItemsActions.CreateItem, user, Item);
        return this.itemsService.create(createItemDto);
    }

    @Get()
    async findAll() {
        const items = await this.itemsService.findAll({});
        if (items.length < 1) throw new ItemNotFoundException();
        return items;
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) item_id: number) {
        return this.itemsService.findById(item_id);
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) item_id: number,
        @Body() updateItemDto: UpdateItemDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const item = await this.itemsService.findById(item_id);
        this.itemsService.checkAbility(ItemsActions.DeleteItem, user, item);
        return this.itemsService.update(item, updateItemDto);
    }

    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) item_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const item = await this.itemsService.findById(item_id);
        this.itemsService.checkAbility(ItemsActions.DeleteItem, user, item);
        return this.itemsService.remove(item);
    }
}
