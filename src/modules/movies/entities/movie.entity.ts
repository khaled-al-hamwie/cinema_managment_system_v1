import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn({ unsigned: true, type: "mediumint" })
    movie_id: number;

    @Column({ type: "varchar", length: 45 })
    title: string;

    @Column({ type: "varchar", length: 500 })
    story_line: string;

    @Column({ type: "mediumint" })
    duration: number;

    @Column({ type: "date" })
    publish_at: Date;

    @Column({ type: "varchar", length: 1500, nullable: true })
    cover_pic: string;

    @Column({ type: "varchar", length: 1500, nullable: true })
    trailer: string;

    @Column({ type: "varchar", length: 1500, nullable: true })
    movie: string;

    @DeleteDateColumn()
    deleted_at: Date;
}
