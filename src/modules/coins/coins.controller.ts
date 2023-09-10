import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CoinsService } from "./coins.service";
import { CreateCoinDto } from "./dto/create-coin.dto";
import { Coin } from "./entities/coin.entity";
import { CoinsActions } from "./enums/coins.actions.enum";
import { CoinNotFoundException } from "./exceptions/coin.not.found.exception";

@UseGuards(LoggedInGuard)
@Controller("coins")
export class CoinsController {
    constructor(private readonly coinsService: CoinsService) {}

    @Post()
    create(
        @Body() createCoinDto: CreateCoinDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.coinsService.checkAbility(CoinsActions.CreateCoin, user, Coin);
        return this.coinsService.create(createCoinDto);
    }

    @Get()
    async findAll() {
        const coins = await this.coinsService.findAll({});
        if (coins.length < 1) throw new CoinNotFoundException();
        return coins;
    }

    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) coin_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const coin = await this.coinsService.findById(coin_id);
        this.coinsService.checkAbility(CoinsActions.DeleteCoin, user, coin);
        return this.coinsService.remove(coin);
    }
}
