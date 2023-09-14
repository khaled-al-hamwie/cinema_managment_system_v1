import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieSessionNotFoundException extends HttpException {
    constructor() {
        super("movie Session not found", HttpStatus.NOT_FOUND);
    }
}
