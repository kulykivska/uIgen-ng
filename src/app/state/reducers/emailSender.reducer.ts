import { Action, createReducer, on } from '@ngrx/store';
import * as EmailSenderActions from '../actions/emailSender.action';
import { initializeEmailState } from '../emailSender.state';
import EmailSenderState from "../emailSender.state";
import {EmailSenderModel} from "../emailSender.model";

const initialEmailState = initializeEmailState();

const reducerEmailSender = createReducer(
  initialEmailState,
  on(EmailSenderActions.GetEmailSenderAction, state => state),
  // @ts-ignore
  on(EmailSenderActions.SuccessGetEmailSenderAction, (state: EmailSenderState, { payload }) => {
    return { ...state, emailInforms: payload, emailInformError: null };
  }),
  // @ts-ignore
  on(EmailSenderActions.CreateEmailSenderAction, (state: EmailSenderState, { payload }) => {
    // @ts-ignore
    const emailInformList: EmailSenderModel[] = state.emailInforms.concat(payload);
    return { ...state, emailInforms: emailInformList, emailInformError: null, emailInformSuccess: null};
  }),
  // @ts-ignore
  on(EmailSenderActions.SuccessEmailSenderAction, (state: EmailSenderState, { payload }) => {
    return { ...state, emailInformError: null, emailInformSuccess: {name: 'Success', message: 'Your request has been sent.'}};
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
  return reducerEmailSender(state, action);
}
