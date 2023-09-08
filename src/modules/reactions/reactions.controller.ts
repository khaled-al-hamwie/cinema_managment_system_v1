import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { RatingsService } from "../ratings/ratings.service";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { Reaction } from "./entities/reaction.entity";
import { ReactionsActions } from "./enums/reactions.actions.enum";
import { ReactionsService } from "./reactions.service";

@UseGuards(LoggedInGuard)
@Controller("reactions")
export class ReactionsController {
    constructor(
        private readonly reactionsService: ReactionsService,
        private readonly ratingsService: RatingsService
    ) {}

    @Put()
    async toggle(
        @Body() createReactionDto: CreateReactionDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        this.reactionsService.checkAbility(
            ReactionsActions.AddReaction,
            user,
            Reaction
        );
        const rating = await this.ratingsService.findById(
            createReactionDto.rating_id
        );
        const already_reacted = await this.reactionsService.findOne({
            where: {
                user: { user_id: user.user_id },
                rating: { rating_id: rating.rating_id },
            },
        });
        if (already_reacted) {
            return this.reactionsService.update(
                already_reacted,
                createReactionDto
            );
        }
        createReactionDto.user = user;
        createReactionDto.rating = rating;
        return this.reactionsService.create(createReactionDto);
    }
}
