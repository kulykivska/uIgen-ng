import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {Observable, of, pipe} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from '../actions/todo.action';
import { ToDoHttpService } from '../httpservices/todo.httpservice';
import ToDo from '../todo.model';
import {BeginEditToDoAction} from "../actions/todo.action";

@Injectable()
export class ToDoEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.todoService.getToDos().pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() => {
      return this.action$.pipe(
        ofType(ToDoActions.BeginCreateToDoAction),
        mergeMap(action => {
          debugger
            return of(ToDoActions.SuccessCreateToDoAction({payload: action.payload}))
          }
          // Here should be request

          // this.todoService.createToDos(action.payload).pipe(
          //   map((data: ToDo) => {
          //     return ToDoActions.SuccessCreateToDoAction({payload: data});
          //   }),
          //   catchError((error: Error) => {
          //     return of(ToDoActions.ErrorToDoAction(error));
          //   })
          // )
        )
      )
    }
  );

  EditToDo$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(ToDoActions.BeginEditToDoAction),
      mergeMap(action => of(ToDoActions.SuccessEditToDoAction({payload: action.payload})))
    );
  });
}
