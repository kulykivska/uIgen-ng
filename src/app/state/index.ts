import { ActionReducerMap } from "@ngrx/store";
import {issueReducer} from "./reducers/issueReducer";
import {emailSenderReducer} from "./reducers/emailSender.reducer";
import EmailSenderState from "./emailSender.state";
import issueState from "./issueState";

interface AppState {
  issueList: issueState;
  emailSender: EmailSenderState;
}

export const reducers: ActionReducerMap<AppState> = {
  issueList: issueReducer,
  emailSender: emailSenderReducer
};
