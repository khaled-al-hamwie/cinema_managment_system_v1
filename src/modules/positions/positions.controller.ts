import { Controller, Get } from "@nestjs/common";
import { PositionNotFoundException } from "./exceptions/position.not.found.exception";
import { PositionsService } from "./positions.service";

@Controller("positions")
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) {}

    @Get()
    async findAll() {
        const positions = await this.positionsService.findAll({});
        if (!positions) throw new PositionNotFoundException();
        return positions;
    }
}
