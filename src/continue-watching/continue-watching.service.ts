import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Repository } from 'typeorm';
import { Video } from '../videos/videos.entity';
import { CustomElasticsearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class ContinueWatchingService {
  constructor(
    @InjectRepository(UserVideoHistory)
    private readonly historyRepo: Repository<UserVideoHistory>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    private readonly esService: CustomElasticsearchService,
  ) {}

  async syncToElasticsearch(history: UserVideoHistory, video: Video) {
    await this.esService.indexDocument({
      user_id: history.user_id,
      video_id: history.video_id,
      watch_duration: history.watch_duration,
      video_total_duration: video.duration,
      watch_percentage: history.watch_percentage,
      last_watched_at: history.last_watched_at,
      video_title: video.title,
      video_thumbnail: video.thumbnail_url,
    });
  }

  async getContinueWatchingFromES(userId: string) {
    const result = await this.esService.searchByUser(userId);
    return result.hits.hits.map(hit => hit._source);
  }

  async getContinueWatching(userId: string) {
    const partialVideos = await this.historyRepo
      .createQueryBuilder('history')
      .where('history.user_id = :userId', { userId })
      .andWhere('history.watch_percentage > 10')
      .andWhere('history.watch_percentage < 90')
      .orderBy('history.last_watched_at', 'DESC')
      .limit(20)
      .getMany();

    const videoIds = partialVideos.map(h => h.video_id);

    const videos = await this.videoRepo.findByIds(videoIds);

    return partialVideos.map(h => {
      const video = videos.find(v => v.id === h.video_id);
      return {
        videoId: h.video_id,
        title: video?.title,
        thumbnail: video?.thumbnail_url,
        duration: video?.duration,
        watchedDuration: h.watch_duration,
        watchPercentage: parseFloat(h.watch_percentage.toString()),
        lastWatchedAt: h.last_watched_at,
        streamingUrl: video?.streaming_url,
      };
    });
  }
}
