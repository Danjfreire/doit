import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async list() {
    return this.todoRepository.find();
  }

  async createTodo(dto: CreateTodoDto) {
    const res = await this.todoRepository.save({
      description: dto.description,
    });

    return res;
  }

  async updateTodo(id: string, dto: CreateTodoDto): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo == null) {
      return null;
    }

    todo.description = dto.description;
    await this.todoRepository.save(todo);

    return todo;
  }
}
