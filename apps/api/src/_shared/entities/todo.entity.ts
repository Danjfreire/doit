import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

const VALID_TODO_STATUSES = ['pending', 'in_progress', 'done'] as const;
export type TodoStatus = (typeof VALID_TODO_STATUSES)[number];

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: VALID_TODO_STATUSES,
    default: 'pending',
  })
  status: TodoStatus;

  @ManyToOne(() => User)
  user: User;

  // this is just the id of the relationship, it should be filled automagically
  @Column({ nullable: false })
  userId: string;
}
