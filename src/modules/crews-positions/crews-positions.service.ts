import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CrewsService } from "../crews/crews.service";
import { Crew } from "../crews/entities/crew.entity";
import { Position } from "../positions/entities/position.entity";
import { PositionsService } from "../positions/positions.service";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CrewPosition } from "./entities/crews-position.entity";
import { CrewsPosotionsActions } from "./enums/crews-positions.actions.enum";
import { CrewPositionAlreadyExistException } from "./exceptions/crew-position.already.exist.exception";
import { CrewPositionNotFoundException } from "./exceptions/crew-position.not.found.exception";
import { CrewsPosotionsAbilityFactory } from "./factories/crews-positions.ability.factory";

@Injectable()
export class CrewsPositionsService {
    constructor(
        @InjectRepository(CrewPosition)
        private crewPositionReppository: Repository<CrewPosition>,
        private readonly crewsPositionsAbilityFactory: CrewsPosotionsAbilityFactory,
        private readonly crewsService: CrewsService,
        private readonly positionsService: PositionsService
    ) {}
    async create(crew: Crew, position: Position) {
        const oldCrewPosition = await this.findOne({
            where: { crew, position },
        });
        if (oldCrewPosition) throw new CrewPositionAlreadyExistException();
        const crewPosition = this.crewPositionReppository.create();
        crewPosition.crew = crew;
        crewPosition.position = position;
        await this.crewPositionReppository.save(crewPosition);
        return crewPosition;
    }

    findOne(options: FindOneOptions<CrewPosition>) {
        return this.crewPositionReppository.findOne(options);
    }

    async findByCrewAndPosition(crew_id: number, position_id: number) {
        const crew = await this.crewsService.findById(crew_id);
        const position = await this.positionsService.findById(position_id);
        const crewPosition = await this.findOne({
            where: {
                crew,
                position,
            },
        });
        if (!crewPosition) throw new CrewPositionNotFoundException();
        return crewPosition;
    }

    async findCrewPositionOrCreate(crew_id: number, position_id: number) {
        const crew = await this.crewsService.findById(crew_id);
        const position = await this.positionsService.findById(position_id);
        const crewPosition = await this.findOne({
            where: {
                crew,
                position,
            },
        });
        if (!crewPosition) return await this.create(crew, position);
        return crewPosition;
    }

    remove(crewPosition: CrewPosition) {
        this.crewPositionReppository.softRemove(crewPosition);
        return {
            message: "the posotion has been removed from the crew succsesfully",
        };
    }

    checkAbility(
        action: CrewsPosotionsActions,
        user: UserPayloadInterface | User
    ) {
        const ability = this.crewsPositionsAbilityFactory.createForUser(user);
        if (ability.cannot(action, Crew)) throw new UserUnauthorizedException();
    }
}
