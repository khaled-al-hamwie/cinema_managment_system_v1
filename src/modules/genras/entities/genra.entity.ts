import { MovieGenra } from "src/modules/movies-genras/entities/movies-genra.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Genra {
    @PrimaryGeneratedColumn({ unsigned: true, type: "tinyint" })
    genra_id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    title: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    description: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => MovieGenra, (movie_genra) => movie_genra.genra)
    movies_genras: MovieGenra[];
}
