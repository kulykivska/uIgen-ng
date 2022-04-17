import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from '../actions/todo.action';
import ToDo from '../todo.model';
import ToDoState, { initializeState } from '../todo.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ToDoActions.GetToDoAction, state => state),
  // @ts-ignore
  on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    // @ts-ignore
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),

  // @ts-ignore
  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  // @ts-ignore
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    debugger
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  // @ts-ignore
  on(ToDoActions.SuccessEditToDoAction, (state: ToDoState, { payload }) => {
    const todoList: ToDo[] = state.ToDos.map(issue => {
        if (issue.id === payload.id) {
          return payload;
        } else {
          return issue;
        }
    });
    return { ...state, ToDos: todoList, ToDoError: null };
  }),
  // @ts-ignore
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  debugger
  // @ts-ignore
  return reducer(state, action);
}
