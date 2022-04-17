import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {EmailValidator, FormGroup} from "@angular/forms";
import {EmailFormInterface} from "./emailForm.interface";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import AppValues from "../../common/app.values";

@Component({
  selector: 'send-email',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(emailModel)">
      <formly-form [form]="form" [fields]="fields" [model]="emailModel" [options]="options"></formly-form>
      <button mat-raised-button type="submit">Submit</button>
    </form>

    <hr/>
    <div *ngIf="emailFormSuccess?.message">
      <div class="alert alert-success" role="alert" id="emailFormSuccessMessage">
        {{emailFormSuccess?.message}}
      </div>
    </div>
  `
})
export class SendEmailComponent {
  @Output() sendEmail = new EventEmitter<EmailFormInterface>();

  public emailFormSuccess: { name: string; message: string; } = {name: '', message: ''};
  public emailModel: EmailFormInterface = {email: '', name: ''};
  public form = new FormGroup({});
  public options: FormlyFormOptions = {};
  public fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        type: "email",
      },
      validators: {
        email: {
          expression: (c: { value: string; }) => !c.value || AppValues.emailPattern.test(c.value),
          message: (error: any, field: FormlyFieldConfig) =>
            `${field.formControl?.value} is not a valid email`
        }
      }
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'First name',
        placeholder: 'Enter your first name',
        required: true,
      }
    }
  ];

  constructor() { }

  public onSubmit(model: EmailFormInterface): void {
    if (this.form.valid) {
      this.sendEmail.emit(model);

      this.emailFormSuccess = {name: 'Success', message: 'Your request has been sent.'}
    }
  }
}
