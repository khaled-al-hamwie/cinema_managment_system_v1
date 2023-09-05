import { Body, Controller, Delete, Put, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { CrewsService } from "../crews/crews.service";
import { PositionsService } from "../positions/positions.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CrewsPositionsService } from "./crews-positions.service";
import { CrewsPositionDto } from "./dto/create-crews-position.dto";
import { CrewsPosotionsActions } from "./enums/crews-positions.actions.enum";
import { CrewPositionNotFoundException } from "./exceptions/crew-position.not.found.exception";

@Controller("crews-positions")
export class CrewsPositionsController {
    constructor(
        private readonly crewsPositionsService: CrewsPositionsService,
        private readonly crewsService: CrewsService,
        private readonly positionsService: PositionsService
    ) {}

    @UseGuards(LoggedInGuard)
    @Put()
    async put(
        @Body() crewsPositionDto: CrewsPositionDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.crewsPositionsService.checkAbility(
            CrewsPosotionsActions.PutCrewPosotion,
            user
        );
        const crew = await this.crewsService.findById(crewsPositionDto.crew_id);
        const position = await this.positionsService.findById(
            crewsPositionDto.position_id
        );
        return this.crewsPositionsService.create(crew, position);
    }

    @Delete()
    async remove(
        @Body() crewsPositionDto: CrewsPositionDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.crewsPositionsService.checkAbility(
            CrewsPosotionsActions.DeleteCrewPosotion,
            user
        );
        const crew = await this.crewsService.findById(crewsPositionDto.crew_id);
        const position = await this.positionsService.findById(
            crewsPositionDto.position_id
        );
        const crewPosition = await this.crewsPositionsService.findOne({
            where: {
                crew,
                position,
            },
        });
        if (!crewPosition) throw new CrewPositionNotFoundException();
        return this.crewsPositionsService.remove(crewPosition);
    }
}
