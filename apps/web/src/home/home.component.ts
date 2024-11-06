import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDto } from '@repo/types/todo';
import { CurrentTodoComponent } from './current-todo/current-todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoListComponent, CurrentTodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pendingTodos: TodoDto[] = [];
  currentTodo?: TodoDto;

  todoService = inject(TodoService);

  ngOnInit() {
    this.loadTodos();
  }

  private loadTodos() {
    this.todoService.loadTodos().subscribe((res) => {
      this.pendingTodos = res.todos.filter((todo) => todo.status === 'pending');
      this.currentTodo = res.todos.find(
        (todo) => todo.status === 'in_progress',
      );
    });
  }
}
