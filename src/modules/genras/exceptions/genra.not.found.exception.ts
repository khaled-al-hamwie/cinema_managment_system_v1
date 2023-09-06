import { HttpException, HttpStatus } from "@nestjs/common";

export class GenraNotFoundException extends HttpException {
    constructor() {
        super("genra not found exception", HttpStatus.NOT_FOUND);
    }
}
