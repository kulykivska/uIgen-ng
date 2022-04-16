//our root app component
import { Component, ViewChild } from '@angular/core';

import { TabsComponent } from './tabs/app-tabs.component';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app',
  template: `
    <app-tabs>
      <my-tab [tabTitle]="'People'">
        <h3>List of People</h3>
        <people-list
          [people]="people"
          (addPerson)="onAddPerson()"
          (editPerson)="onEditPerson($event)">
        </people-list>
        <hr />
        <button class="btn btn-default" (click)="onOpenAbout()"><i class="glyphicon glyphicon-question-sign"></i> About this</button>
      </my-tab>
    </app-tabs>

    <ng-template let-person="person" #personEdit>
      <person-edit [person]="person" (savePerson)="onPersonFormSubmit($event)"></person-edit>
    </ng-template>

    <app-to-do></app-to-do>


    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
    <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
  `
})
export class AppComponent {
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
  public people = [
    {
      id: 1,
      name: 'Juri',
      surname: 'Strumpflohner',
      twitter: '@juristr'
    }
  ];

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

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel: any) {
    if (dataModel.id > 0) {
      this.people = this.people.map(person => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
}
