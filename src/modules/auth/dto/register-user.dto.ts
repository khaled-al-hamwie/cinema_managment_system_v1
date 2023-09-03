import { IsISO8601, IsString, Length } from "class-validator";

export class RegisterUserDto {
    @IsString()
    @Length(8, 45)
    user_name: string;

    @IsString()
    @Length(8, 40)
    password: string;

    @IsString()
    @Length(3, 20)
    first_name: string;

    @IsString()
    @Length(3, 20)
    last_name: string;

    @IsISO8601()
    born_at: Date;
}
