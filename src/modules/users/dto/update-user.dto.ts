import { OmitType } from "@nestjs/swagger";
import { RegisterUserDto } from "src/modules/auth/dto/register-user.dto";

export class UpdateUserDto extends OmitType(RegisterUserDto, [
    "password",
    "user_name",
    "born_at",
]) {}
