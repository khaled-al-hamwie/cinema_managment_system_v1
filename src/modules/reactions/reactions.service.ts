import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { Reaction } from "./entities/reaction.entity";
import { ReactionsActions } from "./enums/reactions.actions.enum";
import { ReactionsAbilityFactory } from "./factories/reactions.ability.factory";

@Injectable()
export class ReactionsService {
    constructor(
        @InjectRepository(Reaction)
        private readonly reactionRepository: Repository<Reaction>,
        private readonly reactionsAbilityProvider: ReactionsAbilityFactory
    ) {}
    create(createReactionDto: CreateReactionDto) {
        delete createReactionDto.rating_id;
        const reaction = this.reactionRepository.create(createReactionDto);
        this.reactionRepository.save(reaction);
        delete reaction.rating.user.password;
        delete reaction.rating.user.is_admin;
        delete reaction.rating.user.deleted_at;
        delete reaction.user.is_admin;
        return reaction;
    }

    findOne(options: FindOneOptions<Reaction>) {
        return this.reactionRepository.findOne(options);
    }

    update(reaction: Reaction, { value }: CreateReactionDto) {
        if (value == reaction.value) {
            return this.remove(reaction);
        }
        reaction.value = value;
        this.reactionRepository.save(reaction);
        return { message: "reaction has been update succsesfuly" };
    }

    remove(reaction: Reaction) {
        this.reactionRepository.remove(reaction);
        return { message: "reaction has been removed succsesfuly" };
    }
    checkAbility(
        action: ReactionsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Reaction> | Reaction
    ) {
        const ability = this.reactionsAbilityProvider.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
