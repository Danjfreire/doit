import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() body: CreateTodoDto) {
    return await this.todoService.createTodo(body);
  }

  @Put('/:id')
  async updateTodo(@Param('id') id: string, @Body() body: CreateTodoDto) {
    const res = await this.todoService.updateTodo(id, body);

    if (!res) {
      throw new NotFoundException('todo-not-found');
    }

    return res;
  }

  @Get()
  async listTodos() {
    const todos = await this.todoService.list();
    return { todos };
  }
}
