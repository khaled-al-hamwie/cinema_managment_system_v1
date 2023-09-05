import { HttpException, HttpStatus } from "@nestjs/common";

export class PositionNotFoundException extends HttpException {
    constructor() {
        super("position not found exception", HttpStatus.NOT_FOUND);
    }
}
