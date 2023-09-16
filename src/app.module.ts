import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { DatabaseModule } from "./core/database/database.module";
import { SessionsModule } from "./core/sessions/sessions.module";
import { UploadModule } from "./core/uploads/upload.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CoinsPurchasesModule } from "./modules/coins-purchases/coins-purchases.module";
import { CoinsModule } from "./modules/coins/coins.module";
import { CrewsPositionsModule } from "./modules/crews-positions/crews-positions.module";
import { CrewsModule } from "./modules/crews/crews.module";
import { GenrasModule } from "./modules/genras/genras.module";
import { ItemsPurchasesModule } from "./modules/items-purchases/items-purchases.module";
import { ItemsModule } from "./modules/items/items.module";
import { MoviesGenrasModule } from "./modules/movies-genras/movies-genras.module";
import { MoviesSessionsModule } from "./modules/movies-sessions/movies-sessions.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { PositionsModule } from "./modules/positions/positions.module";
import { RatingsModule } from "./modules/ratings/ratings.module";
import { ReactionsModule } from "./modules/reactions/reactions.module";
import { RolesModule } from "./modules/roles/roles.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { SeetsModule } from "./modules/seets/seets.module";
import { TicketsModule } from "./modules/tickets/tickets.module";
import { UsersModule } from "./modules/users/users.module";
import { WatchListsModule } from "./modules/watch-lists/watch-lists.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
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
        ReactionsModule,
        CoinsModule,
        CoinsPurchasesModule,
        ItemsModule,
        ItemsPurchasesModule,
        RoomsModule,
        SeetsModule,
        MoviesSessionsModule,
        TicketsModule,
    ],
})
export class AppModule {}
