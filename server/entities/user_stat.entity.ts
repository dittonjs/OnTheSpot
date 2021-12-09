import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contextId: string;

  @Column()
  timesChosen: number;

  @Column()
  timesPresent: number;

  @Column()
  level: number;

  @Column()
  lmsUserId: string;
}
