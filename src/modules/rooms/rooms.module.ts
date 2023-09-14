import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { Room } from "./entities/room.entity";
import { RoomsAbilityFactory } from "./factories/rooms-ability.factory";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
    imports: [TypeOrmModule.forFeature([Room]), UsersModule],
    controllers: [RoomsController],
    providers: [RoomsService, RoomsAbilityFactory],
})
export class RoomsModule {}