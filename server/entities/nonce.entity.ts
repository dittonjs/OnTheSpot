import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Nonce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nonce: string;
}
