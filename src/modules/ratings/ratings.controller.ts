import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { UsersService } from "../users/users.service";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./entities/rating.entity";
import { RatingsActions } from "./enums/ratings.actions.enum";
import { RatingsService } from "./ratings.service";

@Controller("ratings")
export class RatingsController {
    constructor(
        private readonly ratingsService: RatingsService,
        private readonly usersService: UsersService,
        private readonly moviesService: MoviesService
    ) {}

    @UseGuards(LoggedInGuard)
    @Post()
    async create(
        @Body() createRatingDto: CreateRatingDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.ratingsService.checkAbility(
            RatingsActions.CreateRating,
            user,
            Rating
        );
        const movie = await this.moviesService.findById(
            createRatingDto.movie_id
        );
        createRatingDto.movie = movie;
        createRatingDto.user = user;
        delete createRatingDto["movie_id"];
        return this.ratingsService.create(createRatingDto);
    }

    @Get()
    findAll() {
        return this.ratingsService.findAll();
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateRatingDto: UpdateRatingDto) {
        return this.ratingsService.update(+id, updateRatingDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ratingsService.remove(+id);
    }
}
