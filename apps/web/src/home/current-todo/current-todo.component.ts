import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TodoDto } from '@repo/types/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-current-todo',
  standalone: true,
  imports: [],
  templateUrl: './current-todo.component.html',
  styleUrl: './current-todo.component.css',
})
export class CurrentTodoComponent {
  @ViewChild('confirmDialog') private dialog?: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) todo!: TodoDto;

  todoService = inject(TodoService);

  showConfirmationDialog() {
    this.dialog?.nativeElement.showModal();
  }

  closeConfirmationDialog(result: boolean) {
    this.dialog?.nativeElement.close();

    if (result) {
      this.todo.status = 'done';
      this.todoService.updateTodo(this.todo).subscribe((res) => {
        console.log('it is done');
      });
    }
  }
}
