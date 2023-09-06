import { PartialType } from '@nestjs/swagger';
import { CreateMoviesGenraDto } from './create-movies-genra.dto';

export class UpdateMoviesGenraDto extends PartialType(CreateMoviesGenraDto) {}
