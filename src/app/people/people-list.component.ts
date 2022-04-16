import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'people-list',
  template: `
    <table class="table table-striped">
      <thead>
        <th>Name</th>
        <th>Surname</th>
        <th></th>
      </thead>
      <tbody>
        <tr *ngFor="let p of people">
          <td>{{ p.name }}</td>
          <td>{{ p.surname }}</td>
          <td><a href="https://twitter.com/{{ p.twitter }}" target="_blank">{{ p.twitter }}</a></td>
          <td><button mat-button class="btn accent" (click)="editPerson.emit(p)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button mat-button class="btn accent" (click)="addPerson.emit()">Add new person</button>
  `
})
export class PeopleListComponent {
  @Input() people: any;
  @Output() addPerson = new EventEmitter<any>();
  @Output() editPerson = new EventEmitter<any>();
}