import { Rating } from "src/modules/ratings/entities/rating.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Reaction {
    @PrimaryGeneratedColumn({ unsigned: true, type: "bigint" })
    reaction_id: number;

    @Column({ type: "tinyint" })
    value: number;

    @ManyToOne(() => User, (user) => user.reactions)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Rating, (rating) => rating.reactions)
    @JoinColumn({ name: "rating_id" })
    rating: Rating;
}
