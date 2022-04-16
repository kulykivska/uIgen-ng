//our root app component
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { TabsComponent } from './tabs/app-tabs.component';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {select, Store} from "@ngrx/store";
import ToDoState from "./state/todo.state";
import {Observable, Subscription} from "rxjs";
import ToDo, {PriorityType} from "./state/todo.model";
import * as ToDoActions from "./state/actions/todo.action";
import {map} from "rxjs/operators";

@Component({
  selector: 'app',
  template: `
    <div class="container">
    <app-tabs>
      <my-tab [tabTitle]="'ToDo List'">
        <h3>ToDo List</h3>
        <people-list
          [ToDoList]="ToDoList"
          (createIssue)="createNewIssue()"
          (editPerson)="onEditPerson($event)">
        </people-list>
        <hr />
        <button class="btn btn-default" (click)="onOpenAbout()"><i class="glyphicon glyphicon-question-sign"></i> About this</button>
      </my-tab>
    </app-tabs>

    <ng-template let-person="person" #personEdit>
      <person-edit [person]="person" (savePerson)="onPersonFormSubmit($event)"></person-edit>
    </ng-template>


    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
    <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('personEdit') editPersonTemplate: any;
  @ViewChild('about') aboutTemplate: any;
  @ViewChild(TabsComponent)
  tabsComponent!: { openTab: (arg0: string, arg1: any, arg2: {}, arg3: boolean) => void; closeActiveTab: () => void; };

  form = new FormGroup({});
  model: {email: string} = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription | undefined;
  ToDoList: Array<ToDo> = [];

  Title: string = '';
  Description: string = '';
  Priority: PriorityType = PriorityType.Medium;
  IsCompleted: boolean = false;
  Assignee: string = '';


  todoError: Error | null = null;

  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }
  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos || [];
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  onSubmit(model: {email: string}) {
    console.log(model);
  }

  onEditPerson(person: any) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onPersonFormSubmit(dataModel: any) {
    if (dataModel.id > 0) {
      this.ToDoList = this.ToDoList.map(issue => {
        if (issue.id === dataModel.id) {
          return dataModel;
        } else {
          return issue;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.ToDoList.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }

  createNewIssue() {
    this.tabsComponent.openTab('Create New issue', this.editPersonTemplate, {}, true);
    debugger
    const todo: ToDo = { title: this.Title, description: this.Description, priority: this.Priority, assignee: this.Assignee, isCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.setDefaultValues();
  }

  setDefaultValues(): void {
    this.Title = '';
    this.IsCompleted = false;
    this.Description = '';
    this.Priority = PriorityType.Medium;
    this.Assignee = '';
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
