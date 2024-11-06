import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule, Play, Trash2 } from 'lucide-angular';
import { TodoService } from '../shared/todo.service';
import { TodoDto } from '@repo/types/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input({ required: true }) todos: TodoDto[] = [];

  // Lucide icons
  readonly TrashIcon = Trash2;
  readonly PlayIcon = Play;

  todoService = inject(TodoService);

  addTodo() {
    // create a new todo item with a temporary id and add it to the list
    // make a request to the server to create a new todo item
    // if the request is successful, update the todo item with the response to get the real id

    const randomId = 'temp-' + Math.random().toString(32).substring(7);
    const newTodo: TodoDto = {
      id: randomId,
      description: '',
      status: 'pending',
      userId: '',
    };
    this.todos.push(newTodo);

    setTimeout(() => {
      const element = document.getElementById(randomId);
      if (element) {
        element.focus();
      }
    }, 10);

    console.log('todo added!');
    this.printTodos();
  }

  stopEditing(event: Event) {
    event.preventDefault(); // avoid adding a new line
    const element = event.target as HTMLElement;
    element.blur(); // blur triggers the saveTodo method
    return;
  }

  updateDescription(todo: TodoDto, event: Event) {
    const element = event.target as HTMLInputElement;
    todo.description = element.innerText;
  }

  pickTodo(todo: TodoDto) {
    todo.status = 'in_progress';
    this.saveTodo(todo);
  }

  /**
   * Persist the todo item to the server, whether it's a new item or an existing one
   * @param todo Todo item to save
   */
  saveTodo(todo: TodoDto) {
    console.log('savetodo called');
    if (todo.id.startsWith('temp-')) {
      this.todoService.createTodo(todo).subscribe((res) => {
        // update the todo item with the real id generated by the server
        todo.id = res.id;
        console.log('todo created!');
        this.printTodos();
      });
    } else {
      this.todoService.updateTodo(todo).subscribe((res) => {
        console.log('todo updated!');
        this.printTodos();
      });
    }
  }

  deleteTodo(todo: TodoDto) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      console.log('todo deleted!');
      this.printTodos();
    });
  }

  private printTodos() {
    console.log('Total todos:', this.todos.length);
    this.todos.forEach((todo) => {
      console.log(todo);
    });

    console.log(
      '---------------------------------------------------------------',
    );
  }
}
