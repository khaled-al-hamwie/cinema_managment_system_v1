import { Injectable } from '@nestjs/common';
import { CreateMoviesSessionDto } from './dto/create-movies-session.dto';
import { UpdateMoviesSessionDto } from './dto/update-movies-session.dto';

@Injectable()
export class MoviesSessionsService {
  create(createMoviesSessionDto: CreateMoviesSessionDto) {
    return 'This action adds a new moviesSession';
  }

  findAll() {
    return `This action returns all moviesSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesSession`;
  }

  update(id: number, updateMoviesSessionDto: UpdateMoviesSessionDto) {
    return `This action updates a #${id} moviesSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} moviesSession`;
  }
}
