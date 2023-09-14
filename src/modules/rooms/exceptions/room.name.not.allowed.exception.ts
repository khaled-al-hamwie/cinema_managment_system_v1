import { HttpException, HttpStatus } from "@nestjs/common";

export class RoomNameNotAllowedException extends HttpException {
    constructor() {
        super("room name not allowed", HttpStatus.FORBIDDEN);
    }
}
