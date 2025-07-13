import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContinueWatchingModule } from './continue-watching/continue-watching.module';

import { Video } from './videos/videos.entity';
import { UserVideoHistory } from './user-video-history/user-video-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sanjay584',
      password: '',
      database: 'continue-watching',
      entities: [Video, UserVideoHistory],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Video, UserVideoHistory]), 
    ContinueWatchingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
