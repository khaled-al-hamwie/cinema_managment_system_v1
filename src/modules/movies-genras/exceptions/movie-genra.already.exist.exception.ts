import { HttpException, HttpStatus } from "@nestjs/common";

export class MovieGenraAlreadyExistException extends HttpException {
    constructor() {
        super("movie already have the genra error", HttpStatus.FORBIDDEN);
    }
}
