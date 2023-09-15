import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { MovieSession } from "src/modules/movies-sessions/entities/movies-session.entity";
import { Seet } from "src/modules/seets/entities/seet.entity";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";

export class CreateTicketDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    movie_session_id: number;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    seet_id: number;

    seet: Seet;

    movie_session: MovieSession;

    user: UserPayloadInterface;
}
