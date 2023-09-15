import { Room } from "src/modules/rooms/entities/room.entity";
import { Ticket } from "src/modules/tickets/entities/ticket.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
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

    @OneToMany(() => Ticket, (ticket) => ticket.seet)
    tickets: Ticket[];
}
