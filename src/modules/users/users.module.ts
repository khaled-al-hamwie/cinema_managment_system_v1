import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersAbilityFactory } from "./factories/users-ability.factory";
import { UsersFindAllProvider } from "./providers/users-findAll.provider";
import { UsersShowProfileProvider } from "./providers/users-showProfile.provider";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersAbilityFactory,
        UsersFindAllProvider,
        UsersShowProfileProvider,
    ],
    exports: [UsersService],
})
export class UsersModule {}
