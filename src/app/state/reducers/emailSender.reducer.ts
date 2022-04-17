import { Action, createReducer, on } from '@ngrx/store';
import * as EmailSenderActions from '../actions/emailSender.action';
import { initializeState } from '../emailSender.state';
import EmailSenderState from "../emailSender.state";
import {EmailSenderModel} from "../emailSender.model";

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(EmailSenderActions.GetEmailSenderAction, state => state),
  // @ts-ignore
  on(EmailSenderActions.SuccessGetEmailSenderAction, (state: EmailSenderState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  // @ts-ignore
  on(EmailSenderActions.CreateEmailSenderAction, (state: EmailSenderState, todo: EmailSenderModel) => {
    // @ts-ignore
    return { ...state, ToDos: [...state.emailInforms, todo], ToDoError: null, emailInformSuccess: null};
  }),
  // @ts-ignore
  on(EmailSenderActions.SuccessEmailSenderAction, (state: EmailSenderState, { payload }) => {
    debugger
    return { ...state, emailInforms: [...state.emailInforms, payload], emailInformError: null, emailInformSuccess: {name: 'Success', message: 'Was created!'}};
  }),
  // @ts-ignore
  on(EmailSenderActions.ErrorEmailSenderAction, (state: EmailSenderState, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, emailInformError: error };
  })
);

export function emailSenderReducer(
  state: EmailSenderState | undefined,
  action: Action
): EmailSenderState {
  // @ts-ignore
  return reducer(state, action);
}
