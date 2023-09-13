import { Item } from "src/modules/items/entities/item.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ItemPurchase {
    @PrimaryGeneratedColumn({ unsigned: true, type: "bigint" })
    item_purchase_id: number;

    @Column({ type: "decimal", unsigned: true })
    price: number;

    @Column({ type: "int", unsigned: true })
    amount: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.items_purchases)
    user: User;

    @ManyToOne(() => Item, (item) => item.items_purchases)
    item: Item;
}
