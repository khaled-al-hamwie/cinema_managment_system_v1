import { PartialType } from '@nestjs/swagger';
import { CreateMoviesSessionDto } from './create-movies-session.dto';

export class UpdateMoviesSessionDto extends PartialType(CreateMoviesSessionDto) {}
