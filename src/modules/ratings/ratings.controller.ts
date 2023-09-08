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
    UseGuards,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { MoviesService } from "../movies/services/movies.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { FindAllRatingDto } from "./dto/findAll-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { Rating } from "./entities/rating.entity";
import { RatingsActions } from "./enums/ratings.actions.enum";
import { RatingNotFoundException } from "./exceptions/rating.not.found.exception";
import { RatingsFindAllProvider } from "./providers/ratings.findAll.provider";
import { RatingsService } from "./ratings.service";

@Controller("ratings")
export class RatingsController {
    constructor(
        private readonly ratingsService: RatingsService,
        private readonly ratingsFindAllProvider: RatingsFindAllProvider,
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

    @Get(":id")
    async findAll(
        @Param("id", ParseIntPipe) movie_id: number,
        @Query() findAllRatingDto: FindAllRatingDto
    ) {
        const options = this.ratingsFindAllProvider.GetOption(
            findAllRatingDto,
            movie_id
        );
        const ratings = await this.ratingsService.findAll(options);
        if (ratings.length < 1) throw new RatingNotFoundException();
        return this.ratingsFindAllProvider.format(ratings);
    }

    @UseGuards(LoggedInGuard)
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) rating_id: number,
        @Body() updateRatingDto: UpdateRatingDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const rating = await this.ratingsService.findById(rating_id);
        this.ratingsService.checkAbility(
            RatingsActions.UpdateRating,
            user,
            rating
        );
        return this.ratingsService.update(rating, updateRatingDto);
    }

    @UseGuards(LoggedInGuard)
    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) rating_id: number,
        @UserDecorator() user: UserPayloadInterface
    ) {
        const rating = await this.ratingsService.findById(rating_id);
        this.ratingsService.checkAbility(
            RatingsActions.DeleteRating,
            user,
            rating
        );
        return this.ratingsService.remove(rating);
    }
}
