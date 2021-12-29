import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import 'reflect-metadata';
import { User } from '../../users/entities/User';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

@Entity('statements')
export class Statement {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.statement)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
