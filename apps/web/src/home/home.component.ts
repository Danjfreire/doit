import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';

export interface Todo {
  id: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  todoService = inject(TodoService);

  ngOnInit() {
    this.loadTodos();
  }

  private loadTodos() {
    this.todoService.loadTodos().subscribe((res) => {
      this.todos = res.todos;
    });
  }
}
