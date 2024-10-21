import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from '../home.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  createTodo(todo: Todo) {
    return this.http.post<{ id: string; description: string }>(
      `${environment.apiUrl}/todo`,
      { description: todo.description },
    );
  }

  loadTodos() {
    return this.http.get<{ todos: { id: string; description: string }[] }>(
      `${environment.apiUrl}/todo`,
    );
  }
}