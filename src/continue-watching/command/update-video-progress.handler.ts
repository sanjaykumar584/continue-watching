import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVideoProgressCommand } from './update-video-progress.command';
import { ContinueWatchingService } from '../continue-watching.service';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { UseGuards } from '@nestjs/common';

@CommandHandler(UpdateVideoProgressCommand)
export class UpdateVideoProgressHandler implements ICommandHandler<UpdateVideoProgressCommand> {
  constructor(private readonly continueWatchingService: ContinueWatchingService) {}

  async execute(command: UpdateVideoProgressCommand): Promise<any> {
    const { userId, videoId, watchDuration } = command;
    await this.continueWatchingService.invalidateContinueWatchingCache(userId);
    return this.continueWatchingService.updateVideoProgress(userId, videoId, watchDuration);
  }
}
