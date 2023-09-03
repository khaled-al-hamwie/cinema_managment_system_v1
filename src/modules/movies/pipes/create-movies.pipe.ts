import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { MoviesAssetsInterface } from "../interfaces/movies.assets.interface";

@Injectable()
export class CreateMoviesPipe implements PipeTransform {
    async transform(value: MoviesAssetsInterface, metadata: ArgumentMetadata) {
        if (!value) return null;
        const allowedPic = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];
        const allowedVideo = ["mp4", "mkv"];
        if (value.cover_pic) {
            const fileType = value.cover_pic[0].originalname.split(".").pop();
            if (!allowedPic.includes(fileType)) {
                throw new HttpException(
                    "Validation failed: Invalid file type for cover pic",
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        if (value.movie[0]) {
            const fileType = value.movie[0].originalname.split(".").pop();
            if (!allowedVideo.includes(fileType)) {
                throw new HttpException(
                    "Validation failed: Invalid file type for movie",
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        if (value.trailer) {
            const fileType = value.trailer[0].originalname.split(".").pop();
            if (!allowedVideo.includes(fileType)) {
                throw new HttpException(
                    "Validation failed: Invalid file type for trailer",
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        // Transform the validated value into the desired format
        const transformedValue = plainToClass(metadata.metatype, value);

        // Additional validation using class-validator decorators can be performed here if needed
        const errors = await validate(transformedValue);
        if (errors.length > 0) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        }

        return transformedValue;
    }
}
