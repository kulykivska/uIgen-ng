import { Component, Input, Output, EventEmitter } from '@angular/core';
import ToDo from "../state/todo.model";

@Component({
  selector: 'people-list',
  template: `
    <table class="table table-striped todoList--table">
      <thead>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Assignee</th>
        <th>Completed?</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let todo of ToDoList">
          <td>{{ todo.title }}</td>
          <td>{{ todo.description }}</td>
          <td>{{ todo.priority }}</td>
          <td><a href="https://twitter.com/{{ todo.assignee }}" target="_blank">{{ todo.assignee }}</a></td>
          <td><ng-template [ngIf]="todo.isCompleted"><mat-icon>check</mat-icon></ng-template></td>

          <td><button mat-raised-button color="primary" (click)="editIssue.emit(todo)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button mat-raised-button color="primary" (click)="createIssue.emit()">Create issue</button>
  `
})
export class PeopleListComponent {
  @Input() ToDoList: Array<ToDo> = [];
  @Output() createIssue = new EventEmitter<any>();
  @Output() editIssue = new EventEmitter<ToDo>();
}
