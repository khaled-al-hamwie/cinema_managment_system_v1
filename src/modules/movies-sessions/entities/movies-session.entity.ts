import { Movie } from "src/modules/movies/entities/movie.entity";
import { Room } from "src/modules/rooms/entities/room.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
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

    @ManyToOne(() => Room, (room) => room.movie_sessions)
    @JoinColumn({ name: "room_id" })
    room: Room;

    @ManyToOne(() => Movie, (movie) => movie.movie_sessions)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;
}
