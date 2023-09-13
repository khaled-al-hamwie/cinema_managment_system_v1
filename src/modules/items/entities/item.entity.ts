import { ItemPurchase } from "src/modules/items-purchases/entities/items-purchase.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    item_id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    description: string;

    @Column({ type: "decimal", unsigned: true })
    price: number;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => ItemPurchase, (item_purchase) => item_purchase.item)
    items_purchases: ItemPurchase[];
}
