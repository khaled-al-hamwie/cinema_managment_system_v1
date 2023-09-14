import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeetsService } from './seets.service';
import { CreateSeetDto } from './dto/create-seet.dto';
import { UpdateSeetDto } from './dto/update-seet.dto';

@Controller('seets')
export class SeetsController {
  constructor(private readonly seetsService: SeetsService) {}

  @Post()
  create(@Body() createSeetDto: CreateSeetDto) {
    return this.seetsService.create(createSeetDto);
  }

  @Get()
  findAll() {
    return this.seetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeetDto: UpdateSeetDto) {
    return this.seetsService.update(+id, updateSeetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seetsService.remove(+id);
  }
}
