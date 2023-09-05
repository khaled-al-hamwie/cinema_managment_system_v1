import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Crew {
    @PrimaryGeneratedColumn({ unsigned: true, type: "mediumint" })
    crew_id: number;

    @Column({ type: "varchar", length: 20 })
    first_name: string;

    @Column({ type: "varchar", length: 20 })
    last_name: string;

    @Column({ type: "date", nullable: true })
    born_at: Date;

    @Column({ type: "varchar", length: 500, nullable: true })
    description: string;

    @Column({ type: "varchar", length: "1500", nullable: true })
    pic: string;

    @DeleteDateColumn()
    delted_at: Date;
}
