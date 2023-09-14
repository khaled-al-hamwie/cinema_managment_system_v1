import { Injectable } from '@nestjs/common';
import { CreateSeetDto } from './dto/create-seet.dto';
import { UpdateSeetDto } from './dto/update-seet.dto';

@Injectable()
export class SeetsService {
  create(createSeetDto: CreateSeetDto) {
    return 'This action adds a new seet';
  }

  findAll() {
    return `This action returns all seets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seet`;
  }

  update(id: number, updateSeetDto: UpdateSeetDto) {
    return `This action updates a #${id} seet`;
  }

  remove(id: number) {
    return `This action removes a #${id} seet`;
  }
}
