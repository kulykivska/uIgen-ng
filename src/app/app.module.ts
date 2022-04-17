import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TabsComponent} from "./tabs/app-tabs.component";
import {TabComponent} from "./tabs/tab/app-tab.component";
import {PeopleListComponent} from "./people/people-list.component";
import {PersonEditComponent} from "./people/person-edit.component";
import {DynamicTabsDirective} from "./tabs/dynamic-tabs.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { StoreModule } from '@ngrx/store';

import { IssueEffects } from "./state/effects/issue-effects.service";
import {issueReducer} from "./state/reducers/issueReducer";
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import {MatIconModule} from "@angular/material/icon";
import {AboutComponent} from "./components/about/about.component";
import {SendEmailComponent} from "./components/send-email/send-email.component";
import {emailSenderReducer} from "./state/reducers/emailSender.reducer";
import {EmailSenderEffects} from "./state/effects/emailSender.effects";


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    // ToDoComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    PeopleListComponent,
    PersonEditComponent,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    StoreModule.forRoot({issueList: issueReducer, emailSender: emailSenderReducer}),
    EffectsModule.forRoot([IssueEffects, EmailSenderEffects]),
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
