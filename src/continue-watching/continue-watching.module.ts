import { Module } from '@nestjs/common';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Video } from '../videos/videos.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVideoHistory, Video]),
    ElasticsearchModule,
    RedisModule,
  ],
  controllers: [ContinueWatchingController],
  providers: [ContinueWatchingService]
})
export class ContinueWatchingModule {}
