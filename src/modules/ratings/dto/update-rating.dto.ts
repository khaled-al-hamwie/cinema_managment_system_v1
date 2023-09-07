import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateRatingDto } from "./create-rating.dto";

export class UpdateRatingDto extends PartialType(
    OmitType(CreateRatingDto, ["movie", "user", "movie_id"])
) {}
