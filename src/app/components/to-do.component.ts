import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../state/actions/todo.action';
import ToDo from '../state/todo.model';
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
  IsCompleted: boolean = false;

  todoError: Error | null = null;

  createToDo() {
    debugger
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.Title = '';
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
