import { Transform } from "class-transformer";
import { IsISO8601, IsOptional, IsString, Length } from "class-validator";

export class CreateCrewDto {
    @IsString()
    @Length(3, 20)
    first_name: string;

    @IsString()
    @Length(3, 20)
    last_name: string;

    @IsOptional()
    @IsString()
    @Length(3, 500)
    description: string;

    @IsOptional()
    @IsISO8601()
    @Transform(({ value }) => {
        if (new Date(value) < new Date()) return value;
        return new Error("bla not allowd");
    })
    born_at: Date;

    pic?: Express.Multer.File;
}
