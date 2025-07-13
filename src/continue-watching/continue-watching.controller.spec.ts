import { Test, TestingModule } from '@nestjs/testing';
import { ContinueWatchingController } from './continue-watching.controller';

describe('ContinueWatchingController', () => {
  let controller: ContinueWatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinueWatchingController],
    }).compile();

    controller = module.get<ContinueWatchingController>(ContinueWatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
