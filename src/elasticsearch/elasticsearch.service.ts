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
    // Use a composite key of user_id and video_id as the document _id
    const docId = `${document.user_id}_${document.video_id}`;
    return this.elasticsearchService.index({
      index: this.index,
      id: docId,
      document,
    });
  }

  async searchByUser(user_id: string) {
    // check if the index exists
    await this.createIndex();
    
    return this.elasticsearchService.search({
      index: this.index,
      query: {
        match: { user_id },
      },
    });
  }

  async delInd() {
    try {
      await this.elasticsearchService.indices.delete({ index: 'continue_watching' });
      console.log('Index deleted');
    } catch (e) {
      if (e.meta && e.meta.body && e.meta.body.error && e.meta.body.error.type === 'index_not_found_exception') {
        console.log('Index not found, nothing to delete');
      } else {
        console.error('Error deleting index:', e);
        throw e;
      }
    }
  }
}
