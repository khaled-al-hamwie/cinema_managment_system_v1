import { Movie } from "src/modules/movies/entities/movie.entity";
import { Reaction } from "src/modules/reactions/entities/reaction.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
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

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.ratings)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.ratings)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @OneToMany(() => Reaction, (reaction) => reaction.rating)
    reactions: Reaction[];
}
