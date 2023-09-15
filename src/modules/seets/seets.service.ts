import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Room } from "../rooms/entities/room.entity";
import { CreateSeetDto } from "./dto/create-seet.dto";
import { CreateSeetsDto } from "./dto/create-seets.dto";
import { Seet } from "./entities/seet.entity";
import { SeetNotAvailableException } from "./exceptions/seet.not.available.exception";
import { SeetNotFoundException } from "./exceptions/seet.not.found.exception";

@Injectable()
export class SeetsService {
    constructor(
        @InjectRepository(Seet)
        private readonly seetRepository: Repository<Seet>
    ) {}
    async create(createSeetDto: CreateSeetDto) {
        const seet = this.seetRepository.create(createSeetDto);
        await this.seetRepository.save(seet);
        return seet;
    }

    async createSeets({ room, column_count, row_count }: CreateSeetsDto) {
        for (let i = 0; i < row_count; i++) {
            for (let j = 0; j < column_count; j++) {
                await this.create({
                    row_index: i + 1,
                    column_index: j + 1,
                    room,
                });
            }
        }
    }

    findAll(options: FindManyOptions<Seet>) {
        return this.seetRepository.find(options);
    }

    async findOne(options: FindOneOptions<Seet>) {
        return this.seetRepository.findOne(options);
    }

    async findAvailableById(seet_id: number, room: Room) {
        const seet = await this.findOne({
            where: { seet_id, room },
        });
        if (!seet) throw new SeetNotFoundException();
        if (seet.is_preserved == true) throw new SeetNotAvailableException();
        return seet;
    }
    async update(seet: Seet, is_preserved: boolean) {
        seet.is_preserved = is_preserved;
        await this.seetRepository.save(seet);
        return seet;
    }

    async remove(room: Room) {
        const seets = await this.findAll({ where: { room } });
        await this.seetRepository.softRemove(seets);
    }
}
