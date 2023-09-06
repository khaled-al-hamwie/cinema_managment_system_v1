import { Genra } from "src/modules/genras/entities/genra.entity";
import { Movie } from "src/modules/movies/entities/movie.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieGenra {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    movie_genra_id: number;

    @ManyToOne(() => Movie, (movie) => movie.movies_genras)
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @ManyToOne(() => Genra, (genra) => genra.movies_genras)
    @JoinColumn({ name: "genra_id" })
    genra: Genra;
}
