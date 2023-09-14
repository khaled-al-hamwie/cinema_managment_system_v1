import { HttpException, HttpStatus } from "@nestjs/common";

export class RoomNotFoundException extends HttpException {
    constructor() {
        super("Room not found", HttpStatus.NOT_FOUND);
    }
}
