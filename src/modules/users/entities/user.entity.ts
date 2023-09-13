import { CoinPurchase } from "src/modules/coins-purchases/entities/coins-purchase.entity";
import { ItemPurchase } from "src/modules/items-purchases/entities/items-purchase.entity";
import { Rating } from "src/modules/ratings/entities/rating.entity";
import { Reaction } from "src/modules/reactions/entities/reaction.entity";
import { WatchList } from "src/modules/watch-lists/entities/watch-list.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ unsigned: true, type: "int" })
    user_id: number;

    @Column({ type: "varchar", length: 45, unique: true, update: false })
    user_name: string;

    @Column({ type: "varchar", length: 20 })
    first_name: string;

    @Column({ type: "varchar", length: 20 })
    last_name: string;

    @Column({ type: "date" })
    born_at: Date;

    @Column({ nullable: true, type: "varchar", length: "1500" })
    pic: string;

    @Column({ type: "mediumint", default: 0, unsigned: true })
    coins: number;

    @Column({ type: "varchar", length: 500 })
    password: string;

    @Column({ type: "boolean", default: false })
    is_admin: boolean;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => WatchList, (watch_list) => watch_list.user)
    watch_lists: WatchList[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Reaction, (reaction) => reaction.user)
    reactions: Reaction[];

    @OneToMany(() => CoinPurchase, (coin_purchase) => coin_purchase.user)
    coins_purchases: CoinPurchase[];

    @OneToMany(() => ItemPurchase, (item_purchase) => item_purchase.user)
    items_purchases: ItemPurchase[];
}
