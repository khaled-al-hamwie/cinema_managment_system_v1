import { Movie } from "src/modules/movies/entities/movie.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class MovieSession {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    movie_session_id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    details: string;

    @Column({ type: "smallint", unsigned: true })
    duration: number;

    @Column({ type: "datetime" })
    date: Date;

    @Column({ type: "decimal", unsigned: true })
    price: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Room, (room) => room.movie_sessions)
    @JoinColumn({ name: "room_id" })
    room: Room;

    @ManyToOne(() => Movie, (movie) => movie.movie_sessions)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @OneToMany(() => Ticket, (ticket) => ticket.movie_session)
    tickets: Ticket[];
}
