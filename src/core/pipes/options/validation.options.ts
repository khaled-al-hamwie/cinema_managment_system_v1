import { HttpStatus, ValidationPipeOptions } from "@nestjs/common";

export const ValidationOptions: ValidationPipeOptions = {
    whitelist: true,
    errorHttpStatusCode: HttpStatus.FORBIDDEN,
};
