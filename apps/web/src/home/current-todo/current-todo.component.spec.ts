import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTodoComponent } from './current-todo.component';

describe('CurrentTodoComponent', () => {
  let component: CurrentTodoComponent;
  let fixture: ComponentFixture<CurrentTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
