import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProducersAddComponent } from './sites/producers/producers-add/producers-add.component';
import { ProducersEditComponent } from './sites/producers/producers-edit/producers-edit.component';
import { ProducersListComponent } from './sites/producers/producers-list/producers-list.component';
import { ProducersViewComponent } from './sites/producers/producers-view/producers-view.component';
import { ViewStateMessagePipe } from './view-state-message.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProducersAddComponent,
    ProducersEditComponent,
    ProducersListComponent,
    ProducersViewComponent,
    ViewStateMessagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
