import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CrewPosition } from "../crews-positions/entities/crews-position.entity";
import { Movie } from "../movies/entities/movie.entity";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { Role } from "./entities/role.entity";
import { RolesActions } from "./enums/roles.actions.enum";
import { RoleAlreadyExistException } from "./exceptions/role.already.exist.exception";
import { RolesAbilityFactory } from "./factories/roles.ability.factory";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleReppository: Repository<Role>,
        private readonly rolesAbilityFactory: RolesAbilityFactory
    ) {}
    async create(movie: Movie, crew_position: CrewPosition) {
        const role_exist = await this.findOne({
            where: { movie, crew_position },
        });
        if (role_exist) throw new RoleAlreadyExistException();
        const role = this.roleReppository.create();
        role.movie = movie;
        role.crew_position = crew_position;
        this.roleReppository.save(role);
        return role;
    }

    findOne(options: FindOneOptions<Role>) {
        return this.roleReppository.findOne(options);
    }

    async remove(role: Role) {
        await this.roleReppository.remove(role);
        return {
            message: "role has been removed from the movie succsesfully",
        };
    }

    checkAbility(action: RolesActions, user: UserPayloadInterface | User) {
        const ability = this.rolesAbilityFactory.createForUser(user);
        if (ability.cannot(action, Role)) throw new UserUnauthorizedException();
    }
}
