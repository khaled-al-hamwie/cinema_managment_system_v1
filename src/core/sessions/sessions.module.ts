import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import { RedisModule } from "../database/redis/redis.module";
import { SessionsService } from "./sessions.service";
@Module({
    providers: [SessionsService],
    imports: [RedisModule],
})
export class SessionsModule implements NestModule {
    constructor(private readonly sessionsService: SessionsService) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session(this.sessionsService.getConfig()),
                passport.initialize(),
                passport.session()
            )
            .forRoutes("*");
    }
}
