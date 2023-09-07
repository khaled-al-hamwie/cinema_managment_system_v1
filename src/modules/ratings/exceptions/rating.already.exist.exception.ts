import { HttpException, HttpStatus } from "@nestjs/common";

export class RatingAlreadyExistException extends HttpException {
    constructor() {
        super("rating already exist exception", HttpStatus.NOT_FOUND);
    }
}
