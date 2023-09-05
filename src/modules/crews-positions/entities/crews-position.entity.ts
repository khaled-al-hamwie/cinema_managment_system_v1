import { Crew } from "src/modules/crews/entities/crew.entity";
import { Position } from "src/modules/positions/entities/position.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import {
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CrewPosition {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    crew_position_id: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Crew, (crew) => crew.crews_positions, { nullable: false })
    @JoinColumn({ name: "crew_id" })
    crew: Crew;

    @ManyToOne(() => Position, (position) => position.crews_positions, {
        nullable: false,
    })
    @JoinColumn({ name: "position_id" })
    position: Position;

    @OneToMany(() => Role, (role) => role.crew_position)
    roles: Role[];
}
