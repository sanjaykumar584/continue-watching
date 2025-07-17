import { Test, TestingModule } from '@nestjs/testing';
import { ContinueWatchingService } from './continue-watching.service';
import { CustomElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { RedisService } from '../redis/redis.service';

describe('ContinueWatchingService', () => {
  let service: ContinueWatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContinueWatchingService,
        { provide: 'UserVideoHistoryRepository', useValue: {} }, 
        { provide: 'VideoRepository', useValue: {} },            
        { provide: CustomElasticsearchService, useValue: {} },   
        { provide: RedisService, useValue: {} },                 
      ],
    }).compile();

    service = module.get<ContinueWatchingService>(ContinueWatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
