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

import { ToDoEffects } from "./state/effects/todo.effects";
import {ToDoComponent} from "./components/to-do.component";
import {ToDoReducer} from "./state/reducers/todo.reducer";
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    PeopleListComponent,
    PersonEditComponent
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
    StoreModule.forRoot({todos: ToDoReducer}),
    EffectsModule.forRoot([ToDoEffects]),
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
