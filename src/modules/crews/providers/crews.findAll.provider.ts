import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    Like,
} from "typeorm";
import { FindAllCrewDto } from "../dto/findAll-crew.dto";
import { Crew } from "../entities/crew.entity";

@Injectable()
export class CrewsFindAllProvider {
    private PageLength = 40;
    GetOptions(findAllCrewDto: FindAllCrewDto): FindManyOptions<Crew> {
        const options: FindManyOptions<Crew> = {};
        options.where = this.GetWhere(findAllCrewDto);
        options.select = this.GetSelect();
        options.order = this.GetOrder();
        options.take = this.PageLength;
        options.skip = findAllCrewDto.page
            ? findAllCrewDto.page * this.PageLength
            : 0;
        options.relations = this.GetRelation();
        return options;
    }
    GetWhere({
        first_name,
        last_name,
        position_id,
    }: FindAllCrewDto): FindOptionsWhere<Crew> | FindOptionsWhere<Crew>[] {
        const whereOption: FindOptionsWhere<Crew> | FindOptionsWhere<Crew>[] =
            {};
        if (first_name) whereOption["first_name"] = Like(`%${first_name}%`);
        if (last_name) whereOption["last_name"] = Like(`%${last_name}%`);
        if (position_id)
            whereOption["crews_positions"] = { position: { position_id } };
        return whereOption;
    }
    GetOrder(): FindOptionsOrder<Crew> {
        return { first_name: "ASC" };
    }

    GetSelect(): FindOptionsSelect<Crew> {
        return {
            crew_id: true,
            first_name: true,
            last_name: true,
            born_at: true,
            description: true,
            pic: true,
            crews_positions: {
                crew_position_id: true,
                position: {
                    position_id: true,
                    name: true,
                    description: true,
                },
            },
        };
    }

    GetRelation(): FindOptionsRelations<Crew> {
        const relations: FindOptionsRelations<Crew> = {
            crews_positions: { position: true },
        };
        return relations;
    }
}
