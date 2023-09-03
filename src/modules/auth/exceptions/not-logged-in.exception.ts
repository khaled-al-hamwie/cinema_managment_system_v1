import { HttpException, HttpStatus } from "@nestjs/common";

export class NotLoggedInException extends HttpException {
    constructor() {
        super("you are not logged in", HttpStatus.UNAUTHORIZED);
    }
}
