import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { CustomElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [CustomElasticsearchService],
  exports: [NestElasticsearchModule, CustomElasticsearchService],
})
export class ElasticsearchModule {}
