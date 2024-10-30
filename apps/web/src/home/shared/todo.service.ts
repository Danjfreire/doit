import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from '../home.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private defaultUserId = '822ef514-46b9-46cf-9703-4d42e9f5ee68'; // for testing purposes
  constructor(private http: HttpClient) {}

  createTodo(todo: Todo, userId: string = this.defaultUserId) {
    return this.http.post<{ id: string; description: string }>(
      `${environment.apiUrl}/v1/users/${userId}/todos`,
      { description: todo.description },
    );
  }

  updateTodo(todo: Todo, userId: string = this.defaultUserId) {
    return this.http.put<{ id: string; description: string }>(
      `${environment.apiUrl}/v1/users/${userId}/todos/${todo.id}`,
      { description: todo.description },
    );
  }

  deleteTodo(todo: Todo, userId: string = this.defaultUserId) {
    return this.http.delete<void>(
      `${environment.apiUrl}/v1/users/${userId}/todos/${todo.id}`,
    );
  }

  // TODO: remove hardcoded userId
  loadTodos(userId: string = this.defaultUserId) {
    return this.http.get<{ todos: { id: string; description: string }[] }>(
      `${environment.apiUrl}/v1/users/${userId}/todos`,
    );
  }
}
