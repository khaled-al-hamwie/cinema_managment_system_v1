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
import { CreateGenraDto } from "./dto/create-genra.dto";
import { UpdateGenraDto } from "./dto/update-genra.dto";
import { Genra } from "./entities/genra.entity";
import { GenrasActions } from "./enums/genras.actions.enum";
import { GenrasService } from "./genras.service";

@Controller("genras")
export class GenrasController {
    constructor(private readonly genrasService: GenrasService) {}

    @UseGuards(LoggedInGuard)
    @Post()
    create(
        @Body() createGenraDto: CreateGenraDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.genrasService.checkAbility(GenrasActions.CreateGenra, user, Genra);
        return this.genrasService.create(createGenraDto);
    }

    @Get()
    findAll() {
        return this.genrasService.findAll();
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateGenraDto: UpdateGenraDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        return this.genrasService.update(+id, updateGenraDto);
    }

    @Delete(":id")
    remove(
        @Param("id") id: string,
        @UserDecorator() user: UserPayloadInterface
    ) {
        return this.genrasService.remove(+id);
    }
}
