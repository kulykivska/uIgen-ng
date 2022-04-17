import Issue from './issue.model';

export default class issueState {
  ToDos!: Array<Issue>;
  ToDoError!: Error | null;
}

export const initializeState = (): { ToDoError: null; ToDos: Issue[] } => {
  return { ToDos: Array<Issue>(), ToDoError: null };
};
