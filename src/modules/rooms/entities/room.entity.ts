import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn({ type: "tinyint", unsigned: true })
    room_id: number;

    @Column({ unique: true, type: "varchar", length: 45 })
    name: string;

    @Column({ type: "int", unsigned: true })
    row_count: number;

    @Column({ type: "int", unsigned: true })
    column_count: number;
}
