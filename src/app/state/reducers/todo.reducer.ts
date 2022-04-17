import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from '../actions/todo.action';
import ToDo from '../todo.model';
import issueState, { initializeState } from '../issueState';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ToDoActions.GetToDoAction, state => state),
  // @ts-ignore
  on(ToDoActions.CreateToDoAction, (state: issueState, todo: ToDo) => {
    // @ts-ignore
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),

  // @ts-ignore
  on(ToDoActions.SuccessGetToDoAction, (state: issueState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  // @ts-ignore
  on(ToDoActions.SuccessCreateToDoAction, (state: issueState, { payload }) => {
    debugger
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  // @ts-ignore
  on(ToDoActions.SuccessEditToDoAction, (state: issueState, { payload }) => {
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
  on(ToDoActions.ErrorToDoAction, (state: issueState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(
  state: issueState | undefined,
  action: Action
): issueState {
  debugger
  // @ts-ignore
  return reducer(state, action);
}
