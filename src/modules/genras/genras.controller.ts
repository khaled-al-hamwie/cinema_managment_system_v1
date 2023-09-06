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
        return this.genrasService.findAll({});
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) genra_id: number,
        @Body() updateGenraDto: UpdateGenraDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const genra = await this.genrasService.findById(genra_id);
        this.genrasService.checkAbility(GenrasActions.UpdateGenra, user, genra);
        return this.genrasService.update(genra, updateGenraDto);
    }

    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) genra_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const genra = await this.genrasService.findById(genra_id);
        this.genrasService.checkAbility(GenrasActions.UpdateGenra, user, genra);
        return this.genrasService.remove(genra);
    }
}
