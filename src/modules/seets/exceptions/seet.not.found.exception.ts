import { HttpException, HttpStatus } from "@nestjs/common";

export class SeetNotFoundException extends HttpException {
    constructor() {
        super("seet not found exception", HttpStatus.NOT_FOUND);
    }
}
