import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn({ unsigned: true, type: "smallint" })
    position_id: number;

    @Column({ type: "varchar", length: 45, unique: true, update: false })
    name: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    description: string;
}
