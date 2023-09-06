import { HttpException, HttpStatus } from "@nestjs/common";

export class GenraNotAllowedException extends HttpException {
    constructor() {
        super(
            "genra not allowe exception, you can't use this title",
            HttpStatus.FORBIDDEN
        );
    }
}
