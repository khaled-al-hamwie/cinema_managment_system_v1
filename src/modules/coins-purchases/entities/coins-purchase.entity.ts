import { Coin } from "src/modules/coins/entities/coin.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class CoinPurchase {
    @PrimaryGeneratedColumn({ unsigned: true, type: "bigint" })
    coin_purchase_id: number;

    @CreateDateColumn()
    create_at: Date;

    @ManyToOne(() => Coin, (coin) => coin.purchases)
    @JoinColumn({ name: "coin_id" })
    coin: Coin;

    @ManyToOne(() => User, (user) => user.coins_purchases)
    @JoinColumn({ name: "user_id" })
    user: User;
}
