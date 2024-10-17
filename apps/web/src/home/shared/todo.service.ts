import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  createTodo() {
    return this.http.post<{ id: string; description: string }>(
      `${environment.apiUrl}/todo`,
      { description: '' },
    );
  }

  loadTodos() {
    return this.http.get<{ todos: { id: string; description: string }[] }>(
      `${environment.apiUrl}/todo`,
    );
  }
}
