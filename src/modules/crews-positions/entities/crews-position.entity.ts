import { Crew } from "src/modules/crews/entities/crew.entity";
import { Position } from "src/modules/positions/entities/position.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CrewPosition {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    crew_position_id: number;

    @ManyToOne(() => Crew, (crew) => crew.crews_positions, { nullable: false })
    @JoinColumn({ name: "crew_id" })
    crew: Crew;

    @ManyToOne(() => Position, (position) => position.crews_positions, {
        nullable: false,
    })
    @JoinColumn({ name: "position_id" })
    position: Position;
}
