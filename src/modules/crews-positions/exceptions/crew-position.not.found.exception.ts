import { HttpException, HttpStatus } from "@nestjs/common";

export class CrewPositionNotFoundException extends HttpException {
    constructor() {
        super("crew position not found exception", HttpStatus.NOT_FOUND);
    }
}
