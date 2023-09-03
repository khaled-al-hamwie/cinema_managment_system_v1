import { HttpException, HttpStatus } from "@nestjs/common";

export class UserUnauthorizedException extends HttpException {
    constructor() {
        super(
            "user is unauthorized to access this resource",
            HttpStatus.FORBIDDEN
        );
    }
}
