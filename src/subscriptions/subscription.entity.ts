import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Index()
  user_id: number;

  @Column({ nullable: true })
  plan_id: string;

  @Column({ nullable: true })
  subscription_id: string;

  @Column({ nullable: true, type: 'int' })
  total_count: number;

  @Column({ nullable: true, type: 'datetime' })
  current_start: Date;

  @Column({ nullable: true, type: 'int' })
  quantity: number;

  @Column({ nullable: true, type: 'datetime' })
  current_end: Date;

  @Column({ nullable: true, type: 'datetime' })
  start_at: Date;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true, type: 'int' })
  provider_id: number;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  schedule_change_at: string;

  @Column({ nullable: true, type: 'datetime' })
  end_at: Date;

  @Column({ nullable: true, type: 'int' })
  paid_count: number;

  @Column({ nullable: true, type: 'datetime' })
  expire_by: Date;

  @Column({ nullable: true, type: 'json' })
  notes: any;

  @Column({ nullable: true })
  subscription_status: string;

  @Column({ nullable: true, type: 'json' })
  meta_data: any;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true, unique: true })
  external_id: string;

  @Column({ nullable: true, unique: true })
  transaction_id: string;

  @Column({ nullable: true })
  original_transaction_id: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  auth_amount: number;

  @Column({ nullable: true, type: 'datetime' })
  transaction_date: Date;

  @Column({ nullable: true })
  transaction_plan_id: string;

  @Column({ nullable: true, type: 'bigint' })
  currency_id: number;

  @Column({ nullable: true })
  currency_code: string;

  @Column({ nullable: true, type: 'bigint' })
  created_by: number;

  @Column({ nullable: true, type: 'bigint' })
  updated_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
