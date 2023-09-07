import { MovieGenra } from "src/modules/movies-genras/entities/movies-genra.entity";
import { Rating } from "src/modules/ratings/entities/rating.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { WatchList } from "src/modules/watch-lists/entities/watch-list.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
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

    @OneToMany(() => Role, (role) => role.movie)
    roles: Role[];

    @OneToMany(() => MovieGenra, (movie_genra) => movie_genra.movie)
    movies_genras: MovieGenra[];

    @OneToMany(() => WatchList, (watch_list) => watch_list.movie)
    watch_lists: WatchList[];

    @OneToMany(() => Rating, (rating) => rating.movie)
    ratings: Rating[];
}
