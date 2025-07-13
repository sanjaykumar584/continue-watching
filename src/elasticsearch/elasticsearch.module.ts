import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { CustomElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'https://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'your-elasticsearch-password', // You got this on first startup
      },
      tls: {
        rejectUnauthorized: false, // For self-signed certs in development
      },
    }),
  ],
  providers: [CustomElasticsearchService],
  exports: [NestElasticsearchModule, CustomElasticsearchService],
})
export class ElasticsearchModule {}
