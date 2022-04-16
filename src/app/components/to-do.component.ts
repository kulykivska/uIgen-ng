import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as ToDoActions from '../state/actions/todo.action';
import ToDo, {PriorityType} from '../state/todo.model';
import ToDoState from '../state/todo.state';

@Component({
  selector: 'app-to-do',
  templateUrl: 'to-do.component.html'
})
export class ToDoComponent implements OnInit {
  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos || [];
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription | undefined;
  ToDoList: Array<ToDo> = [];

  Title: string = '';
  Description: string = '';
  Priority: PriorityType = PriorityType.Medium;
  IsCompleted: boolean = false;
  Assignee: string = '';

  todoError: Error | null = null;

  createToDo() {
    const todo: ToDo = { id: Math.round(Math.random() * 100), title: this.Title, description: this.Description, priority: this.Priority, assignee: this.Assignee, isCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    this.Title = '';
    this.IsCompleted = false;
    this.Description = '';
    this.Priority = PriorityType.Medium;
    this.Assignee = '';
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
