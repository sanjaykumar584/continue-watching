import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Mandate } from '../mandates/mandate.entity';
import { SubscriptionReportService } from './subscription-report.service';
import { SubscriptionReportController } from './subscription-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Mandate])],
  providers: [SubscriptionReportService],
  controllers: [SubscriptionReportController],
})
export class SubscriptionsModule {}
