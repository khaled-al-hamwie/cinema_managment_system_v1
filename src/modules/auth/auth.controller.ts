import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Session,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

import { UserDecorator } from "src/core/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthAction } from "./enums/auth.actions.enum";
import { AuthAbilityFactory } from "./factories/auth-ability.factory";
import { LocalGuard } from "./guards/local.guard";
import { LoggedInGuard } from "./guards/logged-in.guard";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authAbilityFactory: AuthAbilityFactory
    ) {}

    @Post("register")
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Post("admin/register")
    registerAdmin(
        @Body() registerUserDto: RegisterUserDto,
        @UserDecorator() user: UserPayloadInterface
    ) {
        if (!user) throw new UserUnauthorizedException();
        const ability = this.authAbilityFactory.createForUser(user);
        if (ability.can(AuthAction.RegisterAdmin, User))
            return this.authService.register(registerUserDto, true);
        else throw new UserUnauthorizedException();
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    @UseGuards(LocalGuard)
    login() {
        return { message: "logged in done" };
    }

    @HttpCode(HttpStatus.OK)
    @Post("logout")
    @UseGuards(LoggedInGuard)
    logout(@Session() session: any) {
        session.destroy();
        return { message: "logged out done" };
    }
}
