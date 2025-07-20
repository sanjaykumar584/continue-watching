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
    return this.dataSource.query(`
      SELECT
        s.id AS subscription_id,
        COUNT(m.id) AS total_charges_attempted,
        SUM(CASE WHEN m.status = 'success' THEN 1 ELSE 0 END) AS success_count,
        SUM(CASE WHEN m.status = 'failed' THEN 1 ELSE 0 END) AS failure_count,
        SUM(CASE WHEN m.status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
        ROUND(
          CASE WHEN COUNT(m.id) > 0
            THEN 100.0 * SUM(CASE WHEN m.status = 'success' THEN 1 ELSE 0 END) / COUNT(m.id)
            ELSE 0
          END, 2
        ) AS success_rate_percentage,
        SUM(CASE WHEN m.status = 'success' THEN m.amount ELSE 0 END) AS total_success_amount,
        SUM(CASE WHEN m.status = 'failed' THEN m.amount ELSE 0 END) AS total_failure_amount,
        MAX(m.created_at) AS last_charge_date
      FROM
        subscriptions s
      LEFT JOIN
        mandates m ON m.user_id = s.user_id
      WHERE
        DATE(s.end_at) = CURRENT_DATE + INTERVAL '1 day'
      GROUP BY
        s.id
      ORDER BY
        s.id;
    `);
  }

  async getChargeAttempts() {
    return this.dataSource.query(`
      SELECT
        s.id AS subscription_id,
        s.plan_id,
        s.end_at,
        s.status,
        s.auth_amount,
        s.transaction_date
      FROM
        subscriptions s
    WHERE EXISTS (
      SELECT 1 FROM mandates m WHERE m.user_id = s.user_id
    )
      ORDER BY s.id
    `);
  }

  async overallData() {
    return this.dataSource.query(`
      SELECT
        COUNT(DISTINCT s.id) AS total_subscriptions,
        SUM(CASE WHEN m.status = 'success' THEN 1 ELSE 0 END) AS total_success_count,
        SUM(CASE WHEN m.status = 'failed' THEN 1 ELSE 0 END) AS total_failure_count,
        SUM(CASE WHEN m.status = 'pending' THEN 1 ELSE 0 END) AS total_pending_count,
        ROUND(
          100.0 * SUM(CASE WHEN m.status = 'success' THEN 1 ELSE 0 END) / COUNT(m.id), 2
        ) AS success_rate_percentage,
        SUM(CASE WHEN m.status = 'success' THEN m.amount ELSE 0 END) AS total_success_amount,
        SUM(CASE WHEN m.status = 'failed' THEN m.amount ELSE 0 END) AS total_failure_amount
      FROM
        subscriptions s
      LEFT JOIN
        mandates m ON m.user_id = s.user_id
      WHERE
        DATE(s.end_at) = CURRENT_DATE + INTERVAL '1 day';
      `)
  }
}
