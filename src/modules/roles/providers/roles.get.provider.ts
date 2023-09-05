import { Injectable } from "@nestjs/common";
import { Movie } from "src/modules/movies/entities/movie.entity";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    Like,
} from "typeorm";
import { findAllRoleDto } from "../dto/findAll-role.dto";
import { Role } from "../entities/role.entity";

@Injectable()
export class RolesGetProvider {
    private pageLength = 40;
    GetOption(movie: Movie, findAllRole: findAllRoleDto): FindOneOptions<Role> {
        const options: FindManyOptions<Role> = {};
        options.select = this.GetSelect();
        options.where = this.GetWhere(movie, findAllRole);
        options.relations = this.GetRelations();
        options.take = this.pageLength;
        options.skip = findAllRole.page
            ? findAllRole.page * this.pageLength
            : 0;
        return options;
    }

    private GetSelect(): FindOptionsSelect<Role> {
        return {
            role_id: true,
            crew_position: {
                crew_position_id: true,
                crew: {
                    crew_id: true,
                    first_name: true,
                    last_name: true,
                    pic: true,
                    born_at: true,
                    description: true,
                },
                position: { position_id: true, name: true, description: true },
            },
        };
    }

    private GetWhere(
        movie: Movie,
        { crew_name, position_id }: findAllRoleDto
    ): FindOptionsWhere<Role> | FindOptionsWhere<Role>[] {
        const where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[] = {};
        where["movie"] = movie;
        if (crew_name)
            where["crew_position"] = [
                { crew: { first_name: Like(`%${crew_name}%`) } },
                { crew: { last_name: Like(`%${crew_name}%`) } },
            ];
        if (position_id) where["crew_position"] = { position: { position_id } };
        return where;
    }

    private GetRelations(): FindOptionsRelations<Role> {
        return { crew_position: { position: true, crew: true } };
    }
}
