import ToDo, {PriorityType} from "../app/state/todo.model";

export const toDoListData: ToDo[] =  [
  {
    id: 0,
    title: 'Tech task',
    description: "requirements:\n" +
      "\n" +
      "latest angular & ngrx  stable versions\n" +
      "use ngrx, including effects (for requests) and entities (for storing data)\n" +
      "use formly https://formly.dev/",
    priority: PriorityType.High,
    assignee: 'ngrx_io',
    isCompleted: true
  }
];
