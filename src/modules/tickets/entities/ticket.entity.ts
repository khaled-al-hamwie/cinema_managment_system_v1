import { MovieSession } from "src/modules/movies-sessions/entities/movies-session.entity";
import { Seet } from "src/modules/seets/entities/seet.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    ticket_id: number;

    @Column({ type: "decimal", unsigned: true })
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Seet, (seet) => seet.tickets)
    @JoinColumn({ name: "ticket_id" })
    seet: Seet;

    @ManyToOne(() => User, (user) => user.tickets)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => MovieSession, (movie_session) => movie_session.tickets)
    @JoinColumn({ name: "movie_session_id" })
    movie_session: MovieSession;
}
