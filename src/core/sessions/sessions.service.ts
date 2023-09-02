import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import RedisStore from "connect-redis";
import session from "express-session";
import { REDIS } from "../constants/redis";

@Injectable()
export class SessionsService {
    constructor(
        @Inject(REDIS) private readonly redis,
        private readonly configService: ConfigService
    ) {}

    getConfig(): session.SessionOptions {
        const store: RedisStore = new RedisStore({
            client: this.redis,
            prefix: `${this.configService.get<string>("REDIS_DB_NAME")}:`,
        });
        const cookie: session.CookieOptions = {
            sameSite: true,
            httpOnly: true,
            maxAge: +this.configService.get<string>("COOKIE_MAX_AGE"),
        };
        return {
            store,
            saveUninitialized: false,
            secret: this.configService.get<string>("SESSION_SECRET"),
            resave: false,
            cookie,
        };
    }
}
