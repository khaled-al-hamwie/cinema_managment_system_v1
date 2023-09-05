import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CrewsService } from "./crews.service";
import { CreateCrewDto } from "./dto/create-crew.dto";
import { UpdateCrewDto } from "./dto/update-crew.dto";
import { Crew } from "./entities/crew.entity";
import { CrewsActions } from "./enums/crews.actions.enum";
import { CrewsInterceptor } from "./interceptors/crews.interceptor";
import { CrewsPipe } from "./pipes/crews.pipe";

@Controller("crews")
export class CrewsController {
    constructor(private readonly crewsService: CrewsService) {}

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
    findAll() {
        return this.crewsService.findAll({});
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) crew_id: number) {
        return this.crewsService.findOne({});
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    update(
        @Param("id", ParseIntPipe) crew_id: number,
        @Body() updateCrewDto: UpdateCrewDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.crewsService.checkAbility(CrewsActions.UpdateCrew, user, Crew);
        return this.crewsService.update(+1, updateCrewDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    remove(
        @Param("id", ParseIntPipe) crew_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.crewsService.checkAbility(CrewsActions.DeleteCrew, user, Crew);
        return this.crewsService.remove(+1);
    }
}
