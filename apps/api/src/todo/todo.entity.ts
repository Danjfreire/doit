import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

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
}
