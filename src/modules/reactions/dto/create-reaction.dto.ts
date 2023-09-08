import { Transform } from "class-transformer";
import { IsIn, IsInt, Min } from "class-validator";
import { Rating } from "src/modules/ratings/entities/rating.entity";
import { User } from "src/modules/users/entities/user.entity";
import { UserPayloadInterface } from "src/modules/users/interfaces/user.payload.interface";

export class CreateReactionDto {
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    rating_id: number;

    @IsIn([1, -1])
    value: number;

    user: User | UserPayloadInterface;
    rating: Rating;
}
