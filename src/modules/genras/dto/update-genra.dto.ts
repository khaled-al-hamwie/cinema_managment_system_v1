import { PartialType } from '@nestjs/swagger';
import { CreateGenraDto } from './create-genra.dto';

export class UpdateGenraDto extends PartialType(CreateGenraDto) {}
