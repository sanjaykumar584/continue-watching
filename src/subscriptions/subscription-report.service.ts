import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionReportService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    private readonly dataSource: DataSource,
  ) {}

  async getEndingTomorrowReport() {
    // This query fetches subscriptions ending tomorrow, with mandate info if available
    return this.dataSource.query(`
      SELECT
        s.id AS subscription_id,
        s.user_id,
        s.plan_id,
        s.end_at,
        s.amount,
        s.subscription_status,
        s.status,
        s.created_at,
        s.updated_at,
        m.id AS mandate_id,
        m.payment_method,
        m.amount AS mandate_amount,
        m.mandate_status,
        m.status AS mandate_status_text,
        m.start_date AS mandate_start_date,
        m.end_date AS mandate_end_date
      FROM subscriptions s
      LEFT JOIN mandates m ON m.user_id = s.user_id
      WHERE DATE(s.end_at) = (CURRENT_DATE + INTERVAL '1 day')
      ORDER BY s.end_at ASC
    `);
  }
}
