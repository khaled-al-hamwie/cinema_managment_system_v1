import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/database/database.module";
import { SessionsModule } from "./core/sessions/sessions.module";
import { UploadModule } from "./core/uploads/upload.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CrewsPositionsModule } from "./modules/crews-positions/crews-positions.module";
import { CrewsModule } from "./modules/crews/crews.module";
import { GenrasModule } from "./modules/genras/genras.module";
import { MoviesGenrasModule } from "./modules/movies-genras/movies-genras.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { PositionsModule } from "./modules/positions/positions.module";
import { RolesModule } from "./modules/roles/roles.module";
import { UsersModule } from "./modules/users/users.module";
import { WatchListsModule } from './modules/watch-lists/watch-lists.module';
import { RatingsModule } from './modules/ratings/ratings.module';

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
        CrewsModule,
        CrewsPositionsModule,
        RolesModule,
        GenrasModule,
        MoviesGenrasModule,
        WatchListsModule,
        RatingsModule,
    ],
})
export class AppModule {}
