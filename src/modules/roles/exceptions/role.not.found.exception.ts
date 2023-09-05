import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleNotFoundException extends HttpException {
    constructor() {
        super("role not found exception", HttpStatus.NOT_FOUND);
    }
}
