import { PartialType } from '@nestjs/swagger';
import { CreateSeetDto } from './create-seet.dto';

export class UpdateSeetDto extends PartialType(CreateSeetDto) {}
