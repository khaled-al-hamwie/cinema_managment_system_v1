import { FileFieldsInterceptor } from "@nestjs/platform-express";

export const MoviesInterceptor = FileFieldsInterceptor(
    [
        { name: "cover_pic", maxCount: 1 },
        { name: "trailer", maxCount: 1 },
        { name: "movie", maxCount: 1 },
    ],
    { limits: { fieldSize: 100000000 } }
);
