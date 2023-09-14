import { Module } from '@nestjs/common';
import { MoviesSessionsService } from './movies-sessions.service';
import { MoviesSessionsController } from './movies-sessions.controller';

@Module({
  controllers: [MoviesSessionsController],
  providers: [MoviesSessionsService]
})
export class MoviesSessionsModule {}
