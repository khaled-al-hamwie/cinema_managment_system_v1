import { HttpException, HttpStatus } from "@nestjs/common";

export class ItemPurchaseNotFoundException extends HttpException {
    constructor() {
        super("no items purchased yet exception", HttpStatus.NOT_FOUND);
    }
}
