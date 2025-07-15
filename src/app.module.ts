import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContinueWatchingModule } from './continue-watching/continue-watching.module';

import { Video } from './videos/videos.entity';
import { UserVideoHistory } from './user-video-history/user-video-history.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';

import { Subscription } from './subscriptions/subscription.entity';
import { Mandate } from './mandates/mandate.entity';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: 'sanjay584',
      password: '',
      database: 'continue-watching',
      entities: [Video, UserVideoHistory],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Video, UserVideoHistory, Subscription, Mandate]), 
    ContinueWatchingModule, AuthModule, UsersModule, ElasticsearchModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
