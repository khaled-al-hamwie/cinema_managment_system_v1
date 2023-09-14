import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsActions } from "./enums/rooms.actions.enum";
import { RoomsAbilityFactory } from "./factories/rooms-ability.factory";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly RoomRepository: Repository<Room>,
        private readonly roomAbilityFactory: RoomsAbilityFactory
    ) {}
    create(createRoomDto: CreateRoomDto) {
        return "This action adds a new room";
    }

    findAll() {
        return `This action returns all rooms`;
    }

    findOne(id: number) {
        return `This action returns a #${id} room`;
    }

    update(id: number, updateRoomDto: UpdateRoomDto) {
        return `This action updates a #${id} room`;
    }

    remove(id: number) {
        return `This action removes a #${id} room`;
    }

    checkAbility(
        action: RoomsActions,
        user: UserPayloadInterface | User,
        subject?: ExtractSubjectType<typeof Room> | Room
    ) {
        const ability = this.roomAbilityFactory.createForUser(user);
        if (ability.cannot(action, subject))
            throw new UserUnauthorizedException();
    }
}
