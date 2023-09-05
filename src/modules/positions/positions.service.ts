import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Position } from "./entities/position.entity";

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
}
