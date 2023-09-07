import { HttpException, HttpStatus } from "@nestjs/common";

export class WatchListNotFoundException extends HttpException {
    constructor() {
        super("movie not found in your list exception", HttpStatus.NOT_FOUND);
    }
}
