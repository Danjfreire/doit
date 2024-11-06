import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../_shared/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '@repo/types/todo';

@Controller('/v1/users/:uid/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async listTodos(@Param('uid') userId: string): Promise<{ todos: Todo[] }> {
    const todos = await this.todoService.list(userId);

    return { todos };
  }

  @Post()
  async createTodo(
    @Param('uid') userId: string,
    @Body() body: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.createTodo(userId, body);
  }

  @Put('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ): Promise<Todo> {
    const res = await this.todoService.updateTodo(id, body);

    if (!res) {
      throw new NotFoundException('todo-not-found');
    }

    return res;
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    const res = await this.todoService.deleteTodo(id);

    if (!res) {
      throw new NotFoundException('todo-not-found');
    }
  }
}
