import { Test, TestingModule } from '@nestjs/testing';
import { CustomElasticsearchService } from './elasticsearch.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

describe('CustomElasticsearchService', () => {
  let service: CustomElasticsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomElasticsearchService,
        { provide: ElasticsearchService, useValue: {} }, 
      ],
    }).compile();

    service = module.get<CustomElasticsearchService>(CustomElasticsearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
