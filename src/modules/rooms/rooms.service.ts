import { ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserUnauthorizedException } from "../users/exceptions/userUnauthorized.exception";
import { UserPayloadInterface } from "../users/interfaces/user.payload.interface";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./entities/room.entity";
import { RoomsActions } from "./enums/rooms.actions.enum";
import { RoomNameNotAllowedException } from "./exceptions/room.name.not.allowed.exception";
import { RoomNotFoundException } from "./exceptions/room.not.found.exception";
import { RoomsAbilityFactory } from "./factories/rooms-ability.factory";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly RoomRepository: Repository<Room>,
        private readonly roomAbilityFactory: RoomsAbilityFactory
    ) {}
    async create(createRoomDto: CreateRoomDto) {
        await this.checkRoomName(createRoomDto.name);
        const room = this.RoomRepository.create(createRoomDto);
        this.RoomRepository.save(room);
        return room;
    }

    findAll(options: FindManyOptions<Room>) {
        return this.RoomRepository.find(options);
    }

    findOne(options: FindOneOptions<Room>) {
        return this.RoomRepository.findOne(options);
    }

    async findById(room_id: number) {
        const room = await this.findOne({ where: { room_id } });
        if (!room) throw new RoomNotFoundException();
        return room;
    }

    async update(room: Room, updateRoomDto: UpdateRoomDto) {
        await this.checkRoomName(updateRoomDto.name);
        this.RoomRepository.save({ ...room, ...updateRoomDto });
        return { message: "room has been update" };
    }

    remove(room: Room) {
        this.RoomRepository.softRemove(room);
        return { message: "room has been deleted" };
    }

    async checkRoomName(name: string) {
        const room = await this.findOne({ where: { name } });
        if (room) throw new RoomNameNotAllowedException();
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
