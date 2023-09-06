import { Module } from '@nestjs/common';
import { MoviesGenrasService } from './movies-genras.service';
import { MoviesGenrasController } from './movies-genras.controller';

@Module({
  controllers: [MoviesGenrasController],
  providers: [MoviesGenrasService]
})
export class MoviesGenrasModule {}
