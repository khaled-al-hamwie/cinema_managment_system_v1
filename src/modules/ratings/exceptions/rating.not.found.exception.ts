import { HttpException, HttpStatus } from "@nestjs/common";

export class RatingNotFoundException extends HttpException {
    constructor() {
        super("Rating not found exception", HttpStatus.NOT_FOUND);
    }
}
