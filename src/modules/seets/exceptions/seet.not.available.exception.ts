import { HttpException, HttpStatus } from "@nestjs/common";

export class SeetNotAvailableException extends HttpException {
    constructor() {
        super("seet not available exception", HttpStatus.FORBIDDEN);
    }
}
