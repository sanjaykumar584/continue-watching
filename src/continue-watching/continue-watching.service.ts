import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVideoHistory } from '../user-video-history/user-video-history.entity';
import { Repository } from 'typeorm';
import { Video } from '../videos/videos.entity';
import { CustomElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ContinueWatchingService implements OnModuleInit {
  constructor(
    @InjectRepository(UserVideoHistory)
    private readonly historyRepo: Repository<UserVideoHistory>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    private readonly esService: CustomElasticsearchService,
    private readonly redisService: RedisService,
  ) {}

  private getCacheKey(userId: string) {
    return `continue_watching:user:${userId}`;
  }

  async syncToElasticsearch(history: UserVideoHistory, video: Video) {
    let watch_percentage: number | undefined = undefined;
    if (
      typeof video.duration === 'number' &&
      video.duration > 0 &&
      typeof history.watch_duration === 'number'
    ) {
      watch_percentage = (history.watch_duration / video.duration) * 100;
      if (!Number.isFinite(watch_percentage)) watch_percentage = 0;
    } else {
      watch_percentage = 0;
    }

    await this.esService.indexDocument({
      user_id: history.user_id,
      video_id: history.video_id,
      watch_duration: history.watch_duration,
      video_total_duration: video.duration,
      watch_percentage: watch_percentage,
      last_watched_at: history.last_watched_at,
      video_title: video.title,
      video_thumbnail: video.thumbnail_url,
      streaming_url: video.streaming_url,
    });
    // remove cache for this user
    await this.invalidateContinueWatchingCache(history.user_id);
  }

  async bulkSyncToElasticsearch() {
    const allHistory = await this.historyRepo.find();
    const allVideos = await this.videoRepo.find();
    const videoMap = new Map(allVideos.map(v => [v.id, v]));

    for (const history of allHistory) {
      const video = videoMap.get(history.video_id);
      if (video) {
        await this.syncToElasticsearch(history, video);
      }
    }
  }

  async getContinueWatchingFromES(userId: string) {
    const cacheKey = this.getCacheKey(userId);

    // 1. try cache
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      console.log("inside redis");
      return JSON.parse(cached);
    }

    // 2. if not use ES
    const result = await this.esService.searchByUser(userId);
    const data = result.hits.hits.map(hit => hit._source);
    console.log("from es");

    // cache 1 hour (3600 seconds)
    await this.redisService.set(cacheKey, JSON.stringify(data), 3600);

    return data;
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

  async onModuleInit() {
    await this.bulkSyncToElasticsearch();
  }

  // to remove user cache
  async invalidateContinueWatchingCache(userId: string) {
    const cacheKey = this.getCacheKey(userId);
    await this.redisService.del(cacheKey);
  }

  async updateVideoProgress(
    user_id: string,
    video_id: string,
    watch_duration: number
  ): Promise<any> {
    let history = await this.historyRepo.findOne({ where: { user_id, video_id } });

    const now = new Date();
    let watch_percentage: number | undefined = undefined;
    let video_total_duration = history.video_total_duration;
    console.log(video_total_duration);

    // if (
    //   typeof video_total_duration === 'number' &&
    //   video_total_duration > 0 &&
    //   typeof watch_duration === 'number'
    // ) {
    //   watch_percentage = (watch_duration / video_total_duration) * 100;
    //   if (!Number.isFinite(watch_percentage)) watch_percentage = 0;
    // } else {
    //   watch_percentage = 0;
    // }
    watch_percentage = (watch_duration / video_total_duration) * 100;
    console.log("watch percentage:", watch_percentage)

    if (history) {
      console.log("updating watch percentage")
      history.watch_duration = watch_duration;
      if (watch_percentage !== undefined) history.watch_percentage = watch_percentage;
      history.last_watched_at = now;
      history.updated_at = now;
      await this.historyRepo.save(history);
    }
    return history;
  }
}
