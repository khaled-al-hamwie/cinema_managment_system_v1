import { Module } from '@nestjs/common';
import { WatchListsService } from './watch-lists.service';
import { WatchListsController } from './watch-lists.controller';

@Module({
  controllers: [WatchListsController],
  providers: [WatchListsService]
})
export class WatchListsModule {}
