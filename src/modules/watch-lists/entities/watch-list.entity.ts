import { Movie } from "src/modules/movies/entities/movie.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WatchList {
    @PrimaryGeneratedColumn({ type: "mediumint", unsigned: true })
    watch_list_id: number;

    @ManyToOne(() => User, (user) => user.watch_lists)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.watch_lists)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;
}
