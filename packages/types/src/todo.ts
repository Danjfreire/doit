import { IsString } from "class-validator";

export const VALID_TODO_STATUSES = ["pending", "in_progress", "done"] as const;
export type TodoStatus = (typeof VALID_TODO_STATUSES)[number];

export interface TodoDTO {
  id: string;
  description: string;
  status: TodoStatus;
  userId: string;
}

export class CreateTodoDto {
  @IsString()
  description!: string;
}
