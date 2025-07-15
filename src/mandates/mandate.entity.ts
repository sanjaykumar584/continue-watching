import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('mandates')
export class Mandate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Index()
  source_id: number;

  @Column()
  @Index()
  user_id: number;

  @Column()
  payment_method: string;

  @Column({ nullable: true })
  upi_vpa: string;

  @Column({ nullable: true })
  bank_account_number: string;

  @Column({ nullable: true })
  bank_ifsc: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  mandate_status: string;

  @Column({ nullable: true })
  reference_id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true, type: 'json' })
  meta_data: any;

  @Column({ nullable: true, type: 'datetime' })
  start_date: Date;

  @Column({ nullable: true, type: 'datetime' })
  end_date: Date;

  @Column({ nullable: true, type: 'datetime' })
  cancel_date: Date;

  @Column({ nullable: true })
  cancel_reason: string;

  @Column({ nullable: true, type: 'int' })
  provider_id: number;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  plan_id: string;

  @Column({ nullable: true, type: 'bigint' })
  created_by: number;

  @Column({ nullable: true, type: 'bigint' })
  updated_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
