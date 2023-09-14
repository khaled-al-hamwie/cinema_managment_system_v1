import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesSessionsService } from './movies-sessions.service';
import { CreateMoviesSessionDto } from './dto/create-movies-session.dto';
import { UpdateMoviesSessionDto } from './dto/update-movies-session.dto';

@Controller('movies-sessions')
export class MoviesSessionsController {
  constructor(private readonly moviesSessionsService: MoviesSessionsService) {}

  @Post()
  create(@Body() createMoviesSessionDto: CreateMoviesSessionDto) {
    return this.moviesSessionsService.create(createMoviesSessionDto);
  }

  @Get()
  findAll() {
    return this.moviesSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoviesSessionDto: UpdateMoviesSessionDto) {
    return this.moviesSessionsService.update(+id, updateMoviesSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesSessionsService.remove(+id);
  }
}
