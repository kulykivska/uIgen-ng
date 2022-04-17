//our root app component
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {TabsComponent} from './tabs/app-tabs.component';
import {select, Store} from "@ngrx/store";
import issueState from "./state/issueState";
import {Observable, Subscription} from "rxjs";
import ToDo, {PriorityType} from "./state/todo.model";
import * as ToDoActions from "./state/actions/todo.action";
import * as EmailSenderActions from "./state/actions/emailSender.action";
import {map} from "rxjs/operators";
import {EmailSenderModel} from "./state/emailSender.model";
import EmailSenderState from "./state/emailSender.state";

@Component({
  selector: 'app',
  template: `
    <div class="container">
      <app-tabs>
        <my-tab [tabTitle]="'ToDo List'">
          <mat-card>
            <h3>{{ issueList.length }} Issues: </h3>
            <people-list
              [issueList]="issueList"
              (createIssue)="createNewIssue()"
              (editIssue)="onEditIssue($event)">
            </people-list>
          </mat-card>
          <hr/>
          <mat-card>
            <h3>Want to send ToDo List on email:</h3>
            <send-email (sendEmail)="onSendEmail($event)"></send-email>
            <div *ngFor="let emailInfo of emailList">
              <p>{{emailInfo.email}}</p>
              <p>{{emailInfo.name}}</p>
            </div>
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

  public issueList$: Observable<issueState>;
  public emailSender$: Observable<EmailSenderState>;
  public issueListSubscription: Subscription | undefined;
  public emailSenderSubscription: Subscription | undefined;
  public issueList: Array<ToDo> = [];
  public emailList: Array<EmailSenderModel> = [];

  public todoError: Error | null = null;
  public emailSenderError: Error | null = null;

  constructor(private store: Store<{ issueList: issueState, emailSender: EmailSenderState }>) {
    this.issueList$ = store.pipe(select('issueList'));
    this.emailSender$ = store.pipe(select('emailSender'));
  }

  public ngOnInit(): void {
    this.issueListSubscription = this.issueList$
      .pipe(
        map(x => {
          debugger
          this.issueList = x.ToDos || [];
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.emailSenderSubscription = this.emailSender$
      .pipe(
        map((emailInfo: EmailSenderState) => {
          this.emailList = emailInfo.emailInforms || [];
          this.emailSenderError = emailInfo.emailInformError;
        })
      ).subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
    this.store.dispatch(EmailSenderActions.GetEmailSenderAction());
  }

  public onSendEmail(model: EmailSenderModel): void {
    debugger
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
    this.issueList = this.issueList.map(issue => {
      if (issue.id === dataModel.id) {
        return dataModel;
      } else {
        return issue;
      }
    });

    if (this.issueList.some((issues: ToDo) => issues.id === dataModel.id)) {
      this.store.dispatch(ToDoActions.BeginEditToDoAction({payload: dataModel}));
    } else {
      this.issueList.push(dataModel);
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
    if (this.issueListSubscription) {
      this.issueListSubscription.unsubscribe();
    }
    if (this.emailSenderSubscription) {
      this.emailSenderSubscription.unsubscribe();
    }
  }
}
