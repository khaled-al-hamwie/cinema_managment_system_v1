import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../users/entities/user.entity";
// import { UsersService } from "../users/services/users.service";
import { UsersService } from "../users/users.service";
import { payloadInterface } from "./interfaces/payload.interface";

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }
    serializeUser(
        user: User,
        done: (err: Error, user: payloadInterface) => void
    ) {
        done(null, {
            user_id: user.user_id,
            user_name: user.user_name,
            is_admin: user.is_admin,
        });
    }

    async deserializeUser(
        payload: payloadInterface,
        done: (err: Error, user: Omit<User, "password">) => void
    ) {
        const user = await this.usersService.findOne({
            where: { user_id: payload.user_id },
        });
        if (user) {
            delete user["first_name"];
            delete user["last_name"];
            delete user["born_at"];
            delete user["deleted_at"];
            delete user["coins"];
            delete user["pic"];
        }
        done(null, user);
    }
}
