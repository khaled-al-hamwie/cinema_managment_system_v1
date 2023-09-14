import { MovieSession } from "src/modules/movies-sessions/entities/movies-session.entity";
import { Seet } from "src/modules/seets/entities/seet.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn({ type: "tinyint", unsigned: true })
    room_id: number;

    @Column({ unique: true, type: "varchar", length: 45 })
    name: string;

    @Column({ type: "int", unsigned: true })
    row_count: number;

    @Column({ type: "int", unsigned: true })
    column_count: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => Seet, (seet) => seet.room)
    seets: Seet[];

    @OneToMany(() => MovieSession, (movie_session) => movie_session.room)
    movie_sessions: MovieSession[];
}
