import { CoinPurchase } from "src/modules/coins-purchases/entities/coins-purchase.entity";
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
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

    @OneToMany(() => CoinPurchase, (coin_purchase) => coin_purchase.coin)
    purchases: CoinPurchase[];
}
