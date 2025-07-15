import { Module } from '@nestjs/common';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Video } from '../videos/videos.entity';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { RedisModule } from '../redis/redis.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetContinueWatchingHandler } from './query/get-continue-watching.handler';
import { UpdateVideoProgressHandler } from './command/update-video-progress.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserVideoHistory, Video]),
    ElasticsearchModule,
    RedisModule,
    CqrsModule,
  ],
  controllers: [ContinueWatchingController],
  providers: [
    ContinueWatchingService,
    GetContinueWatchingHandler,
    UpdateVideoProgressHandler,
  ]
})
export class ContinueWatchingModule {}
