import { HttpException, HttpStatus } from "@nestjs/common";

export class ItemNotFoundException extends HttpException {
    constructor() {
        super("item not found exception", HttpStatus.NOT_FOUND);
    }
}
