import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/database/database.module";
import { SessionsModule } from "./core/sessions/sessions.module";
import { UploadModule } from "./core/uploads/upload.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { MoviesModule } from './modules/movies/movies.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        SessionsModule,
        UploadModule,
        UsersModule,
        AuthModule,
        MoviesModule,
        PositionsModule,
    ],
})
export class AppModule {}
