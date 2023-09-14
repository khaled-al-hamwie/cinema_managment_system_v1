import {
    AbilityBuilder,
    ExtractSubjectType,
    createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";
import { UsersService } from "src/modules/users/users.service";
import { Room } from "../entities/room.entity";
import { RoomsActions } from "../enums/rooms.actions.enum";

@Injectable()
export class RoomsAbilityFactory {
    constructor(private readonly usersService: UsersService) {}
    createForUser(user: UserPayloadInterface) {
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (this.usersService.userIsAdmin(user)) {
            can(RoomsActions.CreateRooms, Room);
            can(RoomsActions.UpdateRoom, Room);
            can(RoomsActions.DeleteRoom, Room);
        } else {
            cannot(RoomsActions.CreateRooms, Room);
            cannot(RoomsActions.UpdateRoom, Room);
            cannot(RoomsActions.DeleteRoom, Room);
        }
        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<typeof Room>,
        });
    }
}
