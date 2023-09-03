import { PartialType } from "@nestjs/swagger";
import { RegisterUserDto } from "src/modules/auth/dto/register-user.dto";

export class CreateUserDto extends PartialType(RegisterUserDto) {
    is_admin?: boolean;
}
