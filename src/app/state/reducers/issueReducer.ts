import { Action, createReducer, on } from '@ngrx/store';
import * as IssueActions from '../actions/issue.action';
import Issue from '../issue.model';
import issueState, { initializeState } from '../issueState';

const initialIssueState = initializeState();

const reducerIssue = createReducer(
  initialIssueState,
  on(IssueActions.GetIssueAction, state => state),
  // @ts-ignore
  on(IssueActions.CreateIssueAction, (state: issueState, todo: Issue) => {
    // @ts-ignore
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),

  // @ts-ignore
  on(IssueActions.SuccessGetIssueAction, (state: issueState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  // @ts-ignore
  on(IssueActions.SuccessCreateIssueAction, (state: issueState, { payload }) => {
    debugger
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  // @ts-ignore
  on(IssueActions.SuccessEditIssueAction, (state: issueState, { payload }) => {
    const todoList: Issue[] = state.ToDos.map(issue => {
        if (issue.id === payload.id) {
          return payload;
        } else {
          return issue;
        }
    });
    return { ...state, ToDos: todoList, ToDoError: null };
  }),
  // @ts-ignore
  on(IssueActions.ErrorIssueAction, (state: issueState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })
);

export function issueReducer(
  state: issueState | undefined,
  action: Action
): issueState {
  debugger
  // @ts-ignore
  return reducerIssue(state, action);
}
