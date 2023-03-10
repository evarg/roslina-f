import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ViewStateMessagePipe } from "./view-state-message.pipe";

import { ProducersEditComponent } from "./sites/producers/producers-edit/producers-edit.component";
import { ProducersListComponent } from "./sites/producers/producers-list/producers-list.component";
import { ProducersViewComponent } from "./sites/producers/producers-view/producers-view.component";
import { ProducersDeleteComponent } from "./sites/producers/producers-delete/producers-delete.component";

import { PacketsEditComponent } from "./sites/packets/packets-edit/packets-edit.component";
import { PacketsListComponent } from "./sites/packets/packets-list/packets-list.component";
import { PacketsViewComponent } from "./sites/packets/packets-view/packets-view.component";
import { PacketsDeleteComponent } from "./sites/packets/packets-delete/packets-delete.component";

import { LOCALE_ID } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { UploadFileComponent } from "./componets/upload-file/upload-file.component";

export const DATE_FORMATS = {
    parse: {
        dateInput: "YYYY.MM.DD",
    },
    display: {
        dateInput: "YYYY.MM.DD",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

@NgModule({
    declarations: [
        AppComponent,

        ProducersEditComponent,
        ProducersListComponent,
        ProducersViewComponent,
        ProducersDeleteComponent,

        PacketsEditComponent,
        PacketsListComponent,
        PacketsViewComponent,
        PacketsDeleteComponent,

        ViewStateMessagePipe,
        UploadFileComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        //MatFileUploadModule
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
        { provide: LOCALE_ID, useValue: "en-EN" },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "outline" },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
