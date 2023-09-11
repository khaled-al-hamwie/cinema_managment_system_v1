import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    item_id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "varchar", length: 500 })
    description: string;

    @Column({ type: "decimal", unsigned: true })
    price: number;
}
