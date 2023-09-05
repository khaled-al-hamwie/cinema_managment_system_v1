import { FileInterceptor } from "@nestjs/platform-express";

export const CrewsInterceptor = FileInterceptor("pic", {
    limits: { fieldSize: 10_000_000 },
});
