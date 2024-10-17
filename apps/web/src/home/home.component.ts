import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

interface Todo {
  id: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  todoService = inject(TodoService);

  ngOnInit() {
    this.loadTodos();
  }

  createTodo() {
    // create a new todo item with a temporary id and add it to the list
    // make a request to the server to create a new todo item
    // if the request is successful, update the todo item with the response to get the real id

    const newTodo: Todo = {
      id: 'temp-id',
      description: '',
    };
    this.todos.unshift(newTodo);
    this.todoService.createTodo().subscribe((res) => {
      newTodo.id = res.id;
    });
  }

  private loadTodos() {
    this.todoService.loadTodos().subscribe((res) => {
      this.todos = res.todos;
    });
  }
}
