import { HttpException, HttpStatus } from "@nestjs/common";

export class CoinNotFoundException extends HttpException {
    constructor() {
        super("coin not found exception", HttpStatus.NOT_FOUND);
    }
}
