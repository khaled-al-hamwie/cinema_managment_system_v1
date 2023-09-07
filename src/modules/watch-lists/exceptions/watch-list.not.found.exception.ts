import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieNotFoundException extends HttpException {
    constructor() {
        super("movie not found in your list exception", HttpStatus.NOT_FOUND);
    }
}
