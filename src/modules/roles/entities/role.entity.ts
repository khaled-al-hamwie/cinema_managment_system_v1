import { CrewPosition } from "src/modules/crews-positions/entities/crews-position.entity";
import { Movie } from "src/modules/movies/entities/movie.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn({ unsigned: true, type: "mediumint" })
    role_id: number;

    @ManyToOne(() => Movie, (movie) => movie.roles, { nullable: false })
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @ManyToOne(() => CrewPosition, (crewPosition) => crewPosition.roles, {
        nullable: false,
    })
    @JoinColumn({ name: "crew_position_id" })
    crew_position: CrewPosition;
}
