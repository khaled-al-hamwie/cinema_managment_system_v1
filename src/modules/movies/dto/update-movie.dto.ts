import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(
    OmitType(CreateMovieDto, ["assets"])
) {}
