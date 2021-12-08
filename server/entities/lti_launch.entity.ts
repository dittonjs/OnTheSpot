import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LTILaunch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ type: 'jsonb', array: false })
  config: Record<string, any>;
}
