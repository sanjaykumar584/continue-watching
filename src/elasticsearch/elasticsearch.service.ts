import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class CustomElasticsearchService {
  private readonly index = 'continue_watching';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex() {
    const exists = await this.elasticsearchService.indices.exists({ index: this.index });
    if (!exists) {
      await this.elasticsearchService.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              user_id: { type: 'keyword' },
              video_id: { type: 'keyword' },
              watch_duration: { type: 'integer' },
              video_total_duration: { type: 'integer' },
              watch_percentage: { type: 'float' },
              last_watched_at: { type: 'date' },
              video_title: { type: 'text' },
              video_thumbnail: { type: 'keyword' },
            },
          },
        } as any,
      });
    }
  }

  async indexDocument(document: any) {
    return this.elasticsearchService.index({
      index: this.index,
      document,
    });
  }

  async searchByUser(user_id: string) {
    return this.elasticsearchService.search({
      index: this.index,
      query: {
        match: { user_id },
      },
    });
  }
}
