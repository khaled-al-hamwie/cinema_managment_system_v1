import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from "../users/users.service";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService) {}
    async register(registerUserDto: RegisterUserDto, is_admin = false) {
        const user = await this.UsersService.create({
            ...registerUserDto,
            is_admin,
        });
        delete user.password;
        delete user.deleted_at;
        delete user.is_admin;
        return user;
    }
}
