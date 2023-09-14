import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSeetDto } from "./dto/create-seet.dto";
import { CreateSeetsDto } from "./dto/create-seets.dto";
import { Seet } from "./entities/seet.entity";

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

    findAll() {
        return `This action returns all seets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} seet`;
    }

    update(id: number) {
        return `This action updates a #${id} seet`;
    }

    remove(id: number) {
        return `This action removes a #${id} seet`;
    }
}
