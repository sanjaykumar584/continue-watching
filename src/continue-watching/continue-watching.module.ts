import { Module } from '@nestjs/common';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Video } from '../videos/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVideoHistory, Video])],
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService]
})
export class ContinueWatchingModule {}
