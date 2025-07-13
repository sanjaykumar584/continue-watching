import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column({ nullable: true })
  streaming_url: string;

  @CreateDateColumn()
  created_at: Date;
}
