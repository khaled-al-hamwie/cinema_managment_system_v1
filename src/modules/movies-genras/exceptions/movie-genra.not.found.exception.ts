import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieGenraNotFoundException extends HttpException {
    constructor() {
        super("movie genra not found exception", HttpStatus.NOT_FOUND);
    }
}
