import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { CrewsPositionsService } from "../crews-positions/crews-positions.service";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { findAllRoleDto } from "./dto/findAll-role.dto";
import { RolesDto } from "./dto/roles.dto";
import { RolesActions } from "./enums/roles.actions.enum";
import { RoleNotFoundException } from "./exceptions/role.not.found.exception";
import { RolesGetProvider } from "./providers/roles.get.provider";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
        private readonly moviesService: MoviesService,
        private readonly crewsPositionsService: CrewsPositionsService,
        private readonly rolesGetProvider: RolesGetProvider
    ) {}

    @UseGuards(LoggedInGuard)
    @Put()
    async put(
        @Body() { crew_id, movie_id, position_id }: RolesDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.rolesService.checkAbility(RolesActions.PutRole, user);
        const crewPosition =
            await this.crewsPositionsService.findCrewPositionOrCreate(
                crew_id,
                position_id
            );
        const movie = await this.moviesService.findById(movie_id);
        return this.rolesService.create(movie, crewPosition);
    }

    @Get(":id")
    async get(
        @Param("id", ParseIntPipe) movie_id: number,
        @Query() findAllRole: findAllRoleDto
    ) {
        const movie = await this.moviesService.findById(movie_id);
        const options = this.rolesGetProvider.GetOption(movie, findAllRole);
        const roles = await this.rolesService.findAll(options);
        if (roles.length < 1) throw new RoleNotFoundException();
        return roles;
    }

    @UseGuards(LoggedInGuard)
    @Delete()
    async remove(
        @Body() { movie_id, crew_id, position_id }: RolesDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.rolesService.checkAbility(RolesActions.DeleteRole, user);
        const role = await this.rolesService.findOne({
            where: {
                movie: { movie_id },
                crew_position: { crew: { crew_id }, position: { position_id } },
            },
        });
        if (!role) throw new RoleNotFoundException();
        return this.rolesService.remove(role);
    }
}
