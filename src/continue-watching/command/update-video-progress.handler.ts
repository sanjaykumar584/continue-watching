import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideoProgressCommand } from './update-video-progress.command';
import { ContinueWatchingService } from '../continue-watching.service';

@CommandHandler(UpdateVideoProgressCommand)
export class UpdateVideoProgressHandler implements ICommandHandler<UpdateVideoProgressCommand> {
  constructor(private readonly continueWatchingService: ContinueWatchingService) {}

  async execute(command: UpdateVideoProgressCommand): Promise<any> {
    const { userId, videoId, watchDuration } = command;
    return this.continueWatchingService.updateVideoProgress(userId, videoId, watchDuration);
  }
}
