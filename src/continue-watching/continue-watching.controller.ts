import { Controller, Get, Headers, UseGuards, Request, Body, Post } from '@nestjs/common';
import { ContinueWatchingService } from './continue-watching.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetContinueWatchingQuery } from './query/get-continue-watching.query';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateVideoProgressCommand } from './command/update-video-progress.command';

@Controller('api/v1/continue-watching')
export class ContinueWatchingController {
  constructor(
    private continueService: ContinueWatchingService,
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getContinueWatching(
    @Request() req,
    @Headers('x-language-code') lang: string,
    @Headers('x-platform') platform: string,
  ) {
    const userId = req.user.userId;
    const username = req.user.username;
    console.log('lang:', lang);
    console.log('platform:', platform);
    console.log('userId:', userId);
    console.log('username', username);

    const data = await this.queryBus.execute(new GetContinueWatchingQuery(username));

    return {
      success: true,
      data: {
        continueWatching: data,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('progress')
  async updateProgress(
    @Request() req,
    @Body() body: { videoId: string; watchDuration: number }
  ) {
    const userId = req.user.id;
    console.log("user", userId);
    const { videoId, watchDuration } = body;
    const result = await this.commandBus.execute(
      new UpdateVideoProgressCommand(userId, videoId, watchDuration)
    );
    return { success: true, data: result };
  }
}
