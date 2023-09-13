import { HttpException, HttpStatus } from "@nestjs/common";

export class NoEnoughMoneyException extends HttpException {
    constructor() {
        super("not enouph money", HttpStatus.FORBIDDEN);
    }
}
