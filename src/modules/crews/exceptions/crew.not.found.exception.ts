import { HttpException, HttpStatus } from "@nestjs/common";

export class CrewNotFoundException extends HttpException {
    constructor() {
        super("crew not found exception", HttpStatus.NOT_FOUND);
    }
}
