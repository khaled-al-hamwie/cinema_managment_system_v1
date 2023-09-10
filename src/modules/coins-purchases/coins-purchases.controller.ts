import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinsPurchasesService } from './coins-purchases.service';
import { CreateCoinsPurchaseDto } from './dto/create-coins-purchase.dto';
import { UpdateCoinsPurchaseDto } from './dto/update-coins-purchase.dto';

@Controller('coins-purchases')
export class CoinsPurchasesController {
  constructor(private readonly coinsPurchasesService: CoinsPurchasesService) {}

  @Post()
  create(@Body() createCoinsPurchaseDto: CreateCoinsPurchaseDto) {
    return this.coinsPurchasesService.create(createCoinsPurchaseDto);
  }

  @Get()
  findAll() {
    return this.coinsPurchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coinsPurchasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoinsPurchaseDto: UpdateCoinsPurchaseDto) {
    return this.coinsPurchasesService.update(+id, updateCoinsPurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coinsPurchasesService.remove(+id);
  }
}
