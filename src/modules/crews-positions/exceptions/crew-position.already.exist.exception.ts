import { HttpException, HttpStatus } from "@nestjs/common";

export class CrewPositionAlreadyExistException extends HttpException {
    constructor() {
        super("crew position already exist exception", HttpStatus.NOT_FOUND);
    }
}
