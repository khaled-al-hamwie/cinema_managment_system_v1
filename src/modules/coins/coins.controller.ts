import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CoinsService } from "./coins.service";
import { CreateCoinDto } from "./dto/create-coin.dto";
import { UpdateCoinDto } from "./dto/update-coin.dto";
import { Coin } from "./entities/coin.entity";
import { CoinsActions } from "./enums/coins.actions.enum";

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
    findAll() {
        return this.coinsService.findAll({});
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCoinDto: UpdateCoinDto) {
        return this.coinsService.update(+id, updateCoinDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.coinsService.remove(+id);
    }
}
