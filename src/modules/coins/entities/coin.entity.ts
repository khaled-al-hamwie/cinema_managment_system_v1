import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Coin {
    @PrimaryGeneratedColumn({ unsigned: true, type: "tinyint" })
    coin_id: number;

    @Column({ type: "decimal", unsigned: true })
    price: number;

    @Column({ type: "decimal", unsigned: true })
    amount: number;

    @DeleteDateColumn()
    deleted_at: Date;
}
