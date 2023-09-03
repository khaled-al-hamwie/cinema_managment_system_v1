import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UserDecorator } from "src/core/decorators/user.decorator";
import { IsNull, Not } from "typeorm";
import { LoggedInGuard } from "../auth/guards/logged-in.guard";
import { FindAllUserDto } from "./dto/findAll-user.dto";
import { RestoreUserDto } from "./dto/restore-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersActions } from "./enums/users.actions.enum";
import { UserNotFoundException } from "./exceptions/userNotFound.exception";
import { UserUnauthorizedException } from "./exceptions/userUnauthorized.exception";
import { UsersAbilityFactory } from "./factories/users-ability.factory";
import { AvatarInterceptor } from "./interceptors/avatar.interceptor";
import { UserPayloadInterface } from "./interfaces/user.payload.interface";
import { UsersFindAllProvider } from "./providers/users-findAll.provider";
import { UsersShowProfileProvider } from "./providers/users-showProfile.provider";
import { UsersService } from "./users.service";

@UseGuards(LoggedInGuard)
@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersAbilityFactory: UsersAbilityFactory,
        private readonly usersFindAllProvider: UsersFindAllProvider,
        private readonly usersShowProfileProvider: UsersShowProfileProvider
    ) {}

    @Get()
    async findAll(
        @UserDecorator() user: User,
        @Query() findAllUserDto: FindAllUserDto
    ) {
        const ability = this.usersAbilityFactory.createForUser(user);
        if (ability.can(UsersActions.SeeUsers, User)) {
            const options =
                this.usersFindAllProvider.GetOptions(findAllUserDto);
            const users = await this.usersService.findAll(options);
            if (users.length < 1) throw new UserNotFoundException();
            return users;
        }
        throw new UserUnauthorizedException();
    }
    @Get("profile")
    async showProfile(@UserDecorator() user: UserPayloadInterface) {
        const options = this.usersShowProfileProvider.GetOptions(user.user_id);
        const profile = await this.usersService.findOne(options);
        return profile;
    }

    @Get(":id")
    async findOne(
        @UserDecorator() user: UserPayloadInterface,
        @Param("id", ParseIntPipe) user_id: number
    ) {
        const ability = this.usersAbilityFactory.createForUser(user);
        if (ability.can(UsersActions.SeeUsers, User)) {
            const requiredUser = await this.usersService.findOne({
                where: { user_id },
            });
            if (!requiredUser) throw new UserNotFoundException();
            return requiredUser;
        }
        throw new UserUnauthorizedException();
    }

    @Patch()
    update(
        @UserDecorator() user: UserPayloadInterface,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(user, updateUserDto);
    }

    // @UseInterceptors(AvatarInterceptor)
    // @Put("avatar")
    // async addAvatar(
    //     @UserDecorator("user_id") user_id: number,
    //     @UploadedFile() avatar: Express.Multer.File,
    // ) {
    //     return this.usersService.putAvatar(user_id, avatar);
    // }

    @Delete()
    async remove(@UserDecorator("user_id") user_id: number) {
        const wantedUser = await this.usersService.findOne({
            where: { user_id },
        });
        return this.usersService.remove(wantedUser);
    }

    // @Post("restore")
    // async restore(
    //     @UserDecorator() user: User,
    //     @Body() restoreUserDto: RestoreUserDto,
    // ) {
    //     const ability = this.usersAbilityFactory.createForUser(user);
    //     if (ability.cannot(Action.Restore, User))
    //         throw new UnauthorizedException();
    //     const wantedUser = await this.usersService.findOne({
    //         where: {
    //             user_name: restoreUserDto.user_name,
    //             deleted_at: Not(IsNull()),
    //         },
    //         relations: { role: true },
    //         withDeleted: true,
    //     });
    //     if (!wantedUser) throw new UserNotFoundException();
    //     if (ability.can(Action.Restore, wantedUser)) {
    //         return this.usersService.restore(wantedUser);
    //     }
    //     throw new UserNotFoundException();
    // }

    // @Delete(":id")
    // async block(
    //     @UserDecorator() user: User,
    //     @Param("id", ParseIntPipe) user_id: number,
    // ) {
    //     const ability = this.usersAbilityFactory.createForUser(user);
    //     if (ability.cannot(Action.Delete, User))
    //         throw new UnauthorizedException();
    //     const wantedUser = await this.usersService.findOne({
    //         where: { user_id },
    //         relations: { role: true },
    //     });
    //     if (!wantedUser) throw new UserNotFoundException();
    //     if (ability.can(Action.Delete, wantedUser)) {
    //         return this.usersService.remove(wantedUser);
    //     }
    //     throw new UserNotFoundException();
    // }
}
