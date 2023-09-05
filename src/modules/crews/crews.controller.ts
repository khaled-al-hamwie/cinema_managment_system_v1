import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CrewsService } from "./crews.service";
import { CreateCrewDto } from "./dto/create-crew.dto";
import { FindAllCrewDto } from "./dto/findAll-crew.dto";
import { UpdateCrewDto } from "./dto/update-crew.dto";
import { Crew } from "./entities/crew.entity";
import { CrewsActions } from "./enums/crews.actions.enum";
import { CrewNotFoundException } from "./exceptions/crew.not.found.exception";
import { CrewsInterceptor } from "./interceptors/crews.interceptor";
import { CrewsPipe } from "./pipes/crews.pipe";
import { CrewsFindAllProvider } from "./providers/crews.findAll.provider";
import { CrewsFindOneProvider } from "./providers/crews.findOne.provider";

@Controller("crews")
export class CrewsController {
    constructor(
        private readonly crewsService: CrewsService,
        private readonly crewsFindOneProvider: CrewsFindOneProvider,
        private readonly crewsFindAllProvider: CrewsFindAllProvider
    ) {}

    @UseInterceptors(CrewsInterceptor)
    @UseGuards(LoggedInGuard)
    @Post()
    create(
        @Body() createCrewDto: CreateCrewDto,
        @UserDecorator() user: UserPayloadInterface,
        @UploadedFile(new CrewsPipe()) pic?: Express.Multer.File
    ) {
        this.crewsService.checkAbility(CrewsActions.CreateCrew, user, Crew);
        createCrewDto.pic = pic;
        return this.crewsService.create(createCrewDto);
    }

    @Get()
    async findAll(@Query() findAllCrewDto: FindAllCrewDto) {
        const options = this.crewsFindAllProvider.GetOptions(findAllCrewDto);
        const crews = await this.crewsService.findAll(options);
        if (crews.length < 1) throw new CrewNotFoundException();
        return crews;
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) crew_id: number) {
        const options = this.crewsFindOneProvider.GetOptions(crew_id);
        const crew = await this.crewsService.findOne(options);
        if (!crew) throw new CrewNotFoundException();
        return crew;
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) crew_id: number,
        @Body() updateCrewDto: UpdateCrewDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const crew = await this.crewsService.findOne({ where: { crew_id } });
        if (!crew) throw new CrewNotFoundException();
        this.crewsService.checkAbility(CrewsActions.UpdateCrew, user, crew);
        return this.crewsService.update(crew, updateCrewDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) crew_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const crew = await this.crewsService.findOne({ where: { crew_id } });
        if (!crew) throw new CrewNotFoundException();
        this.crewsService.checkAbility(CrewsActions.DeleteCrew, user, crew);
        return this.crewsService.remove(crew);
    }
}
