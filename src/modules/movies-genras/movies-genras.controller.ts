import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesGenrasService } from './movies-genras.service';
import { CreateMoviesGenraDto } from './dto/create-movies-genra.dto';
import { UpdateMoviesGenraDto } from './dto/update-movies-genra.dto';

@Controller('movies-genras')
export class MoviesGenrasController {
  constructor(private readonly moviesGenrasService: MoviesGenrasService) {}

  @Post()
  create(@Body() createMoviesGenraDto: CreateMoviesGenraDto) {
    return this.moviesGenrasService.create(createMoviesGenraDto);
  }

  @Get()
  findAll() {
    return this.moviesGenrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesGenrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoviesGenraDto: UpdateMoviesGenraDto) {
    return this.moviesGenrasService.update(+id, updateMoviesGenraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesGenrasService.remove(+id);
  }
}
