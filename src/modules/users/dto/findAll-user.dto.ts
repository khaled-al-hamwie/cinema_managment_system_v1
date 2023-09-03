import { Transform } from "class-transformer";
import {
    IsISO8601,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { UserSortOptionsInterface } from "../interfaces/user.sort.options.interfacte";

export class FindAllUserDto {
    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsString()
    user_name: string;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    coins_less_than: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    coins_more_than: number;

    @IsOptional()
    @IsISO8601()
    born_before: Date;

    @IsOptional()
    @IsISO8601()
    born_after: Date;

    @IsOptional()
    @IsIn(["yes"], {
        message: "you can only provide yes or don't provide an option",
    })
    only_deleted: boolean;

    @IsOptional()
    @IsIn(["yes"], {
        message: "you can only provide yes or don't provide an option",
    })
    only_admin: boolean;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(0)
    page: number;

    @IsOptional()
    @IsIn([
        "first_name_ASC",
        "first_name_DESC",
        "last_name_ASC",
        "last_name_DESC",
        "user_name_ASC",
        "user_name_DESC",
        "coins_ASC",
        "coins_DESC",
    ])
    sort: UserSortOptionsInterface;
}
