import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieAlreadyExistInWatchListException extends HttpException {
    constructor() {
        super(
            "movie already exists in watch list exception",
            HttpStatus.FORBIDDEN
        );
    }
}
