import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Issue from "../state/issue.model";

@Component({
  selector: 'person-edit',
  template: `
    <form [formGroup]="issueForm" (ngSubmit)="onPersonFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" placeholder="Title" formControlName="title">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description" formControlName="description">
      </div>
      <div class="form-group">
        <label for="priority">Priority</label>
        <input type="text" class="form-control" id="priority" placeholder="Priority" formControlName="priority">
      </div>
      <div class="col-auto">
        <label class="sr-only" for="inlineFormInputGroup">Assignee</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <input type="text" class="form-control" id="assignee" placeholder="Assignee" formControlName="assignee">
        </div>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="isCompleted" formControlName="isCompleted">
        <label class="form-check-label" for="isCompleted">Completed?</label>
      </div>


      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class PersonEditComponent implements OnInit {
  @Input() issue!: Issue;
  @Output() saveIssue = new EventEmitter<Issue>();

  public issueForm: FormGroup;

  constructor(private fb: FormBuilder) {
    debugger
    this.issueForm = this.fb.group({
      id: '',
      title: '',
      description: '',
      priority: '',
      assignee: '',
      isCompleted: false
    });
  }

  ngOnInit() {
    debugger
    this.issueForm.setValue({
      id: this.issue.id || 0,
      title: this.issue.title || '',
      description: this.issue.description || '',
      priority: this.issue.priority || '',
      assignee: this.issue.assignee || '',
      isCompleted: this.issue.isCompleted || false
    });
  }

  onPersonFormSubmit() {
    let dataModel: Issue = this.issueForm.value;
    this.saveIssue.emit(dataModel);
  }
}
