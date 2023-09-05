import { Injectable } from "@nestjs/common";
import { FindOneOptions } from "typeorm";
import { Crew } from "../entities/crew.entity";

@Injectable()
export class CrewsFindOneProvider {
    GetOptions(crew_id: number): FindOneOptions<Crew> {
        const options: FindOneOptions<Crew> = {};
        options.where = { crew_id };
        options.select = {
            crew_id: true,
            first_name: true,
            last_name: true,
            born_at: true,
            description: true,
            pic: true,
        };
        return options;
    }
}
