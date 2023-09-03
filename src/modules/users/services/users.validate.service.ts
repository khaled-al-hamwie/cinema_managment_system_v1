import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { User } from "../entities/user.entity";
import { UsersActions } from "../enums/users.actions.enum";
import { CredentailsDontMatchException } from "../exceptions/credentails-dont-match.exception";
import { UserUnauthorizedException } from "../exceptions/userUnauthorized.exception";
import { UsersAbilityFactory } from "../factories/users-ability.factory";
import { UserPayloadInterface } from "../interfaces/user.payload.interface";
import { UsersService } from "../users.service";

@Injectable()
export class UsersValidateService {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersAbilityFactory: UsersAbilityFactory
    ) {}

    async validate(
        user: User,
        password: string
    ): Promise<UserPayloadInterface> {
        if (user && compareSync(password, user.password)) {
            return {
                user_id: user.user_id,
                user_name: user.user_name,
                is_admin: user.is_admin,
            };
        }
        throw new CredentailsDontMatchException();
    }

    checkAbility(
        action: UsersActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof User> | User
    ) {
        const ability = this.usersAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
