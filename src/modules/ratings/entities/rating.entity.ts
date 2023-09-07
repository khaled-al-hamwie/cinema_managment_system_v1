import { Movie } from "src/modules/movies/entities/movie.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn({ unsigned: true, type: "bigint" })
    rating_id: number;

    @Column({ type: "decimal", unsigned: true })
    rating: number;

    @Column({
        type: "varchar",
        length: 2000,
        nullable: true,
    })
    comment: string;

    @ManyToOne(() => User, (user) => user.ratings)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.ratings)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;
}
