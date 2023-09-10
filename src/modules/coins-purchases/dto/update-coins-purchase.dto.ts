import { PartialType } from '@nestjs/swagger';
import { CreateCoinsPurchaseDto } from './create-coins-purchase.dto';

export class UpdateCoinsPurchaseDto extends PartialType(CreateCoinsPurchaseDto) {}
