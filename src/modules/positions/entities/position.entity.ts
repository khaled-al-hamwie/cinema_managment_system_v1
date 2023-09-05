import { CrewPosition } from "src/modules/crews-positions/entities/crews-position.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn({ unsigned: true, type: "smallint" })
    position_id: number;

    @Column({ type: "varchar", length: 45, unique: true, update: false })
    name: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    description: string;

    @OneToMany(() => CrewPosition, (crew_position) => crew_position.position)
    crews_positions: CrewPosition[];
}
