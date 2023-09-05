import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Crew } from "../crews/entities/crew.entity";
import { Position } from "../positions/entities/position.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CrewPosition } from "./entities/crews-position.entity";
import { CrewsPosotionsActions } from "./enums/crews-positions.actions.enum";
import { CrewPositionAlreadyExistException } from "./exceptions/crew-position.already.exist.exception";
import { CrewsPosotionsAbilityFactory } from "./factories/crews-positions.ability.factory";

@Injectable()
export class CrewsPositionsService {
    constructor(
        @InjectRepository(CrewPosition)
        private crewPositionReppository: Repository<CrewPosition>,
        private readonly crewsPositionsAbilityFactory: CrewsPosotionsAbilityFactory
    ) {}
    async create(crew: Crew, position: Position) {
        const oldCrewPosition = await this.findOne({
            where: { crew, position },
        });
        if (oldCrewPosition) throw new CrewPositionAlreadyExistException();
        const crewPosition = this.crewPositionReppository.create();
        crewPosition.crew = crew;
        crewPosition.position = position;
        this.crewPositionReppository.save(crewPosition);
        return crewPosition;
    }

    findOne(options: FindOneOptions<CrewPosition>) {
        return this.crewPositionReppository.findOne(options);
    }

    remove(crewPosition: CrewPosition) {
        this.crewPositionReppository.remove(crewPosition);
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
