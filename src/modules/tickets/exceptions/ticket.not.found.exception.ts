import { HttpException, HttpStatus } from "@nestjs/common";

export class TicketNotFoundException extends HttpException {
    constructor() {
        super("ticket not found exception", HttpStatus.NOT_FOUND);
    }
}
