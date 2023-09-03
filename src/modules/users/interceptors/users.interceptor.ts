import { FileInterceptor } from "@nestjs/platform-express";

export const UsersInterceptor = FileInterceptor("pic", {
    limits: { fileSize: 10000000 },
});
