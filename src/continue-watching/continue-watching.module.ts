import { Module } from '@nestjs/common';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Video } from '../videos/videos.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVideoHistory, Video]),
    ElasticsearchModule,
  ],
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService]
})
export class ContinueWatchingModule {}
