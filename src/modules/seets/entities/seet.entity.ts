import { Room } from "src/modules/rooms/entities/room.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Seet {
    @PrimaryGeneratedColumn({ unsigned: true, type: "mediumint" })
    seet_id: number;

    @Column({ type: "boolean", default: false })
    is_preserved: boolean;

    @Column({ type: "int", unsigned: true })
    row_index: number;

    @Column({ type: "int", unsigned: true })
    column_index: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Room, (room) => room.seets)
    @JoinColumn({ name: "room_id" })
    room: Room;
}
