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
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async listTodos(): Promise<{ todos: Todo[] }> {
    const todos = await this.todoService.list();
    return { todos };
  }

  @Post()
  async createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(body);
  }

  @Put('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: CreateTodoDto,
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
