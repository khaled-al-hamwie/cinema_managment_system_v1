import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MainValidationPipe } from "./core/pipes/main.validation.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(MainValidationPipe);
    await app.listen(3000);
}
bootstrap();
