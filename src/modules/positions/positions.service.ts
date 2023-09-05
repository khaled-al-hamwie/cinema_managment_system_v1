import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Position } from "./entities/position.entity";
import { PositionNotFoundException } from "./exceptions/position.not.found.exception";

@Injectable()
export class PositionsService {
    constructor(
        @InjectRepository(Position)
        private PositionRepositry: Repository<Position>
    ) {}
    findAll(options: FindManyOptions<Position>) {
        return this.PositionRepositry.find(options);
    }

    findOne(options: FindOneOptions<Position>) {
        return this.PositionRepositry.findOne(options);
    }

    async findById(position_id: number) {
        const position = await this.findOne({ where: { position_id } });
        if (!position) throw new PositionNotFoundException();
        return position;
    }
}
