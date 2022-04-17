import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Issue, {PriorityType} from "../state/issue.model";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";

@Component({
  selector: 'issue-edit',
  template: `
    <form [formGroup]="form" (ngSubmit)="onPersonFormSubmit(issueModel)">
      <formly-form [form]="form" [fields]="fields" [model]="issueModel" [options]="options"></formly-form>
      <button mat-raised-button color="primary" class="mt-3" type="submit">Save</button>
    </form>
  `
})
export class IssueEditComponent implements OnInit {
  @Input() issue!: Issue;
  @Output() saveIssue = new EventEmitter<Issue>();

  public issueModel: Issue = new Issue;
  public form = new FormGroup({});
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      templateOptions: {
        label: 'id',
      },
      hideExpression: 'true',
    },
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Title',
        placeholder: 'Title',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'input',
      className: 'mt-2 d-block',
      templateOptions: {
        label: 'Description',
        placeholder: 'Description'
      },
    },
    {
      key: 'priority',
      type: 'select',
      className: 'mt-2 d-block',
      templateOptions: {
        label: 'Priority',
        placeholder: 'Priority',
        required: true,
        options: Object.values(PriorityType).map((type: string) => {
          return {value: type, label: type};
        })
      },
    },
    {
      key: 'assignee',
      type: 'input',
      className: 'mt-2 d-block',
      templateOptions: {
        placeholder: 'Assignee',
        required: true,
        addonLeft: {
          class: 'input-group-text__icon fa fa-at',
        },
        label: 'Assignee',
      },
    },
    {
      key: 'isCompleted',
      type: 'checkbox',
      className: 'mt-4 d-block',
      templateOptions: {
        label: 'Completed?',
      },
    },
  ];

  constructor() {}

  public ngOnInit(): void {
    this.issueModel = Object.assign({}, this.issue);
  }

  public onPersonFormSubmit(model: Issue): void {
    if (this.form.valid) {
      this.saveIssue.emit(model);
    }
  }
}
