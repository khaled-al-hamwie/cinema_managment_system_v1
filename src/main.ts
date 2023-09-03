import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/pipes/main.validation.pipe";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(MainValidationPipe);
    app.useStaticAssets(join(__dirname, "..", "uploads"));
    await app.listen(4000);
}
bootstrap();
