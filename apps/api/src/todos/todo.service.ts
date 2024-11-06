import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../_shared/entities/todo.entity';
import { CreateTodoDto } from './create-todo.dto';
import { User } from 'src/_shared/entities/user.entity';
import { UpdateTodoDto } from '@repo/types/todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async list(userId: string) {
    const user = new User();
    user.id = userId;
    return this.todoRepository.findBy({ user });
  }

  async createTodo(userId: string, dto: CreateTodoDto) {
    const user = new User();
    user.id = userId;

    const res = await this.todoRepository.save({
      description: dto.description,
      user,
    });

    return res;
  }

  async updateTodo(id: string, dto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo == null) {
      return null;
    }

    todo.description = dto.description;
    todo.status = dto.status;
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (todo == null) {
      return null;
    }

    return await this.todoRepository.remove(todo);
  }
}
