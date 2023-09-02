import { Injectable } from "@nestjs/common";
// import { UsersService } from "../users/services/users.service";
import { UsersService } from "../users/users.service";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService) {}
    async register(registerUserDto: RegisterUserDto) {
        const user = await this.UsersService.create(registerUserDto);
        delete user.password;
        return user;
    }
}
