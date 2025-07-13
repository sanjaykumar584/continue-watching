import { Test, TestingModule } from '@nestjs/testing';
import { ContinueWatchingService } from './continue-watching.service';

describe('ContinueWatchingService', () => {
  let service: ContinueWatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinueWatchingService],
    }).compile();

    service = module.get<ContinueWatchingService>(ContinueWatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
