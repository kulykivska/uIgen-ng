import ToDo from './todo.model';

export default class issueState {
  ToDos!: Array<ToDo>;
  ToDoError!: Error | null;
}

export const initializeState = (): { ToDoError: null; ToDos: ToDo[] } => {
  return { ToDos: Array<ToDo>(), ToDoError: null };
};
