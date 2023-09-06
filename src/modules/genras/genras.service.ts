import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateGenraDto } from "./dto/create-genra.dto";
import { UpdateGenraDto } from "./dto/update-genra.dto";
import { Genra } from "./entities/genra.entity";
import { GenrasActions } from "./enums/genras.actions.enum";
import { GenraNotAllowedException } from "./exceptions/genra.not.allowed.exception";
import { GenrasAbilityFactory } from "./factories/genras.ability.factory";

@Injectable()
export class GenrasService {
    constructor(
        @InjectRepository(Genra)
        private readonly genraRepository: Repository<Genra>,
        private readonly genraAbilityFactory: GenrasAbilityFactory
    ) {}
    async create(createGenraDto: CreateGenraDto) {
        const sameGenera = await this.findOne({
            where: { title: createGenraDto.title },
        });
        if (sameGenera) throw new GenraNotAllowedException();
        const genra = this.genraRepository.create(createGenraDto);
        this.genraRepository.save(genra);
        return genra;
    }

    findAll() {
        return `This action returns all genras`;
    }

    findOne(options: FindOneOptions<Genra>) {
        return this.genraRepository.findOne(options);
    }

    update(id: number, updateGenraDto: UpdateGenraDto) {
        return `This action updates a #${id} genra`;
    }

    remove(id: number) {
        return `This action removes a #${id} genra`;
    }

    checkAbility(
        action: GenrasActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Genra> | Genra
    ) {
        const ability = this.genraAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
