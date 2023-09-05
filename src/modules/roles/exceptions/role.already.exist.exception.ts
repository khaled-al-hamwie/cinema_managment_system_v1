import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleAlreadyExistException extends HttpException {
    constructor() {
        super("role already exist exception", HttpStatus.NOT_FOUND);
    }
}
