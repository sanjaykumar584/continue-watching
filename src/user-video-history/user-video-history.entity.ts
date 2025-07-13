import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, 
  Index,
  Unique,
} from 'typeorm';

@Entity('user_video_history')
@Unique(['user_id', 'video_id'])
export class UserVideoHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  user_id: string;

  @Column()
  video_id: string;

  @Column()
  watch_duration: number;

  @Column()
  video_total_duration: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  watch_percentage: number;

  @Column({ type: 'timestamp' })
  last_watched_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
