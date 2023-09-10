import { Injectable } from '@nestjs/common';
import { CreateCoinsPurchaseDto } from './dto/create-coins-purchase.dto';
import { UpdateCoinsPurchaseDto } from './dto/update-coins-purchase.dto';

@Injectable()
export class CoinsPurchasesService {
  create(createCoinsPurchaseDto: CreateCoinsPurchaseDto) {
    return 'This action adds a new coinsPurchase';
  }

  findAll() {
    return `This action returns all coinsPurchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coinsPurchase`;
  }

  update(id: number, updateCoinsPurchaseDto: UpdateCoinsPurchaseDto) {
    return `This action updates a #${id} coinsPurchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} coinsPurchase`;
  }
}
