//our root app component
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {TabsComponent} from './tabs/app-tabs.component';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {select, Store} from "@ngrx/store";
import ToDoState from "./state/todo.state";
import {Observable, Subscription} from "rxjs";
import ToDo, {PriorityType} from "./state/todo.model";
import * as ToDoActions from "./state/actions/todo.action";
import {map} from "rxjs/operators";
import {BeginEditToDoAction} from "./state/actions/todo.action";
import {TabComponent} from "./tabs/tab/app-tab.component";
import {PersonEditComponent} from "./people/person-edit.component";
import {EmailFormInterface} from "./components/send-email/emailForm.interface";

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <app-tabs>
        <my-tab [tabTitle]="'ToDo List'">
          <h3>{{ ToDoList.length }} Issues: </h3>
          <hr/>
          <mat-card>
            <people-list
              [ToDoList]="ToDoList"
              (createIssue)="createNewIssue()"
              (editIssue)="onEditIssue($event)">
            </people-list>
          </mat-card>
          <hr/>
          <mat-card>
            <h3>Want to send ToDo List on email:</h3>
            <send-email (sendEmail)="onSendEmail($event)"></send-email>
          </mat-card>
          <hr/>
          <button mat-raised-button (click)="onOpenAbout()">
            <mat-icon>info</mat-icon>
            About this component
          </button>
        </my-tab>
      </app-tabs>

      <ng-template let-issue="person" #personEdit>
        <person-edit [issue]="issue" (saveIssue)="onIssueFormSubmit($event)"></person-edit>
      </ng-template>

      <ng-template #about>
        <about></about>
      </ng-template>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('personEdit') editPersonTemplate: ElementRef | undefined;
  @ViewChild('about') aboutTemplate: ElementRef | undefined;
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;

  public todo$: Observable<ToDoState>;
  public ToDoSubscription: Subscription | undefined;
  public ToDoList: Array<ToDo> = [];

  todoError: Error | null = null;

  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  public ngOnInit(): void {
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          debugger
          this.ToDoList = x.ToDos || [];
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  public onSendEmail(model: EmailFormInterface): void {
    console.log(model);
  }

  public onEditIssue(issue: ToDo): void {
    this.tabsComponent.openTab(
      `Editing ${issue.title}`,
      this.editPersonTemplate,
      issue,
      true
    );
  }

  public onIssueFormSubmit(dataModel: ToDo) {
    this.ToDoList = this.ToDoList.map(issue => {
      if (issue.id === dataModel.id) {
        return dataModel;
      } else {
        return issue;
      }
    });

    if (this.ToDoList.some((issues: ToDo) => issues.id === dataModel.id)) {
      this.store.dispatch(ToDoActions.BeginEditToDoAction({payload: dataModel}));
    } else {
      this.ToDoList.push(dataModel);
      this.store.dispatch(ToDoActions.BeginCreateToDoAction({payload: dataModel}));
    }

    this.tabsComponent.closeActiveTab();
  }

  public onOpenAbout(): void {
    this.tabsComponent.openTab('About', this.aboutTemplate, null, true);
  }

  public createNewIssue(): void {
    this.tabsComponent.openTab('Create New issue', this.editPersonTemplate, AppComponent.newEmptyIssue(), true);
  }

  private static newEmptyIssue(): ToDo {
    return {
      id: Math.round(Math.random() * 100),
      title: '',
      description: '',
      priority: PriorityType.Medium,
      assignee: '',
      isCompleted: false
    };
  }

  public ngOnDestroy(): void {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
