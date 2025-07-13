import { Controller, Get, Headers, UseGuards, Request } from '@nestjs/common';
import { ContinueWatchingService } from './continue-watching.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/continue-watching')
export class ContinueWatchingController {
  constructor(private readonly continueService: ContinueWatchingService) {}

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

    const data = await this.continueService.getContinueWatching(username);

    return {
      success: true,
      data: {
        continueWatching: data,
      },
    };
  }
}
