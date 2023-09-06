import { Injectable } from '@nestjs/common';
import { CreateMoviesGenraDto } from './dto/create-movies-genra.dto';
import { UpdateMoviesGenraDto } from './dto/update-movies-genra.dto';

@Injectable()
export class MoviesGenrasService {
  create(createMoviesGenraDto: CreateMoviesGenraDto) {
    return 'This action adds a new moviesGenra';
  }

  findAll() {
    return `This action returns all moviesGenras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesGenra`;
  }

  update(id: number, updateMoviesGenraDto: UpdateMoviesGenraDto) {
    return `This action updates a #${id} moviesGenra`;
  }

  remove(id: number) {
    return `This action removes a #${id} moviesGenra`;
  }
}
