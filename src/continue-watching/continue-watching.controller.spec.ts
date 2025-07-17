import { Test, TestingModule } from '@nestjs/testing';
import { ContinueWatchingController } from './continue-watching.controller';
import { ContinueWatchingService } from './continue-watching.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

describe('ContinueWatchingController', () => {
  let controller: ContinueWatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinueWatchingController],
      providers: [
        { provide: ContinueWatchingService, useValue: {} }, 
        { provide: QueryBus, useValue: { execute: jest.fn() } }, 
        { provide: CommandBus, useValue: { execute: jest.fn() } }, 
      ],
    }).compile();

    controller = module.get<ContinueWatchingController>(ContinueWatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
