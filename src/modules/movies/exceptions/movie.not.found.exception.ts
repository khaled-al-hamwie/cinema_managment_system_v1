import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieNotFoundException extends HttpException {
    constructor() {
        super("movie not found exception", HttpStatus.NOT_FOUND);
    }
}
