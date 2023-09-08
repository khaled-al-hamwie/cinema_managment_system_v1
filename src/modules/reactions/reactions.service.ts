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
        return "This action adds a new reaction";
    }

    findOne(options: FindOneOptions<Reaction>) {
        return this.reactionRepository.findOne(options);
    }

    update() {
        return `This action updates a #{id} reaction`;
    }

    remove(id: number) {
        return `This action removes a #${id} reaction`;
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
