import { Injectable } from "@nestjs/common";
import {
    FindManyOptions,
    FindOptionsOrder,
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
        return options;
    }
    GetWhere({
        first_name,
        last_name,
    }: FindAllCrewDto): FindOptionsWhere<Crew> | FindOptionsWhere<Crew>[] {
        const whereOption: FindOptionsWhere<Crew> | FindOptionsWhere<Crew>[] =
            {};
        if (first_name) whereOption["first_name"] = Like(`%${first_name}%`);
        if (last_name) whereOption["last_name"] = Like(`%${last_name}%`);

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
        };
    }
}
