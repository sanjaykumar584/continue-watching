import { Module } from '@nestjs/common';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';

@Module({
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService]
})
export class ContinueWatchingModule {}
