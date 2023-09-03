import { Injectable } from "@nestjs/common";
import { UploadService } from "src/core/uploads/upload.service";
import { MoviesAssetsInterface } from "../interfaces/movies.assets.interface";

@Injectable()
export class MoviesUploadAssetsService {
    constructor(private readonly uploadService: UploadService) {}
    uploadAssets({ cover_pic, movie, trailer }: MoviesAssetsInterface) {
        let cover_path: string;
        let trailer_path: string;
        let movie_path: string;
        if (cover_pic) {
            cover_path = this.uploadService.createName(
                cover_pic[0].originalname
            );
            this.uploadService.upload(
                cover_pic[0].buffer,
                cover_path,
                "cover-pictures"
            );
        }
        if (trailer) {
            trailer_path = this.uploadService.createName(
                trailer[0].originalname
            );
            this.uploadService.upload(
                trailer[0].buffer,
                trailer_path,
                "trailers"
            );
        }
        if (movie) {
            movie_path = this.uploadService.createName(movie[0].originalname);
            this.uploadService.upload(movie[0].buffer, movie_path, "movies");
        }
        return { movie_path, cover_path, trailer_path };
    }
}
