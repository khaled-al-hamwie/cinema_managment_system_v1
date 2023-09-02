import { HttpException, HttpStatus } from "@nestjs/common";

export class CredentailsDontMatchException extends HttpException {
    constructor() {
        super("Credentails don't match", HttpStatus.FORBIDDEN);
    }
}
