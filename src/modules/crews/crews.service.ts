import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UploadService } from "src/core/uploads/upload.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateCrewDto } from "./dto/create-crew.dto";
import { UpdateCrewDto } from "./dto/update-crew.dto";
import { Crew } from "./entities/crew.entity";
import { CrewsActions } from "./enums/crews.actions.enum";
import { CrewsAbilityFactory } from "./factories/crews.ability.factory";

@Injectable()
export class CrewsService {
    constructor(
        @InjectRepository(Crew) private CrewRepositry: Repository<Crew>,
        private readonly crewssAbilityProvider: CrewsAbilityFactory,
        private readonly UploadService: UploadService
    ) {}
    create(createCrewDto: CreateCrewDto) {
        const pic = this.Upload(createCrewDto);
        delete createCrewDto.pic;
        const crew = this.CrewRepositry.create({ ...createCrewDto, pic });
        this.CrewRepositry.save(crew);
        return crew;
    }

    findAll(options: FindManyOptions<Crew>) {
        return this.CrewRepositry.find(options);
    }

    findOne(options: FindOneOptions<Crew>) {
        return this.CrewRepositry.findOne(options);
    }

    update(id: number, updateCrewDto: UpdateCrewDto) {
        return `This action updates a #${id} crew`;
    }

    remove(id: number) {
        return `This action removes a #${id} crew`;
    }

    checkAbility(
        action: CrewsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Crew> | Crew
    ) {
        const ability = this.crewssAbilityProvider.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }

    private Upload(createCrewDto: CreateCrewDto) {
        let pic = "";
        if (createCrewDto.pic) {
            pic = this.UploadService.createName(createCrewDto.pic.originalname);
            this.UploadService.upload(
                createCrewDto.pic.buffer,
                pic,
                "crews-pictures"
            );
        } else pic = "";
        return pic;
    }
}
