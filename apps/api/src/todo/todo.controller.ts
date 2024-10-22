import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() body: CreateTodoDto) {
    return await this.todoService.createTodo(body);
  }

  @Get()
  async listTodos() {
    const todos = await this.todoService.list();
    return { todos };
  }
}
