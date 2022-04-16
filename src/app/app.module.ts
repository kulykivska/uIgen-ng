import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TabsComponent} from "./tabs/app-tabs.component";
import {TabComponent} from "./tabs/tab/app-tab.component";
import {PeopleListComponent} from "./people/people-list.component";
import {PersonEditComponent} from "./people/person-edit.component";
import {DynamicTabsDirective} from "./tabs/dynamic-tabs.directive";
import {ReactiveFormsModule} from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    PeopleListComponent,
    PersonEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TabsComponent]
})
export class AppModule { }
