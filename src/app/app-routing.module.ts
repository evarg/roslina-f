import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProducersEditComponent } from "./sites/producers/producers-edit/producers-edit.component";
import { ProducersListComponent } from "./sites/producers/producers-list/producers-list.component";
import { ProducersViewComponent } from "./sites/producers/producers-view/producers-view.component";
import { ProducersDeleteComponent } from "./sites/producers/producers-delete/producers-delete.component";

import { PacketsEditComponent } from "./sites/packets/packets-edit/packets-edit.component";
import { PacketsListComponent } from "./sites/packets/packets-list/packets-list.component";
import { PacketsViewComponent } from "./sites/packets/packets-view/packets-view.component";
import { PacketsDeleteComponent } from "./sites/packets/packets-delete/packets-delete.component";
import { UploadFileComponent } from "./componets/upload-file/upload-file.component";
import { PacketFormAddFileComponent } from "./sites/packets/packet-form-add-file/packet-form-add-file.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { HomeComponent } from "./sites/home/home.component";
import { MainPageComponent } from "./layout/main-page/main-page.component";
import { SubPageComponent } from "./layout/sub-page/sub-page.component";
import { ContactComponent } from "./sites/sub/contact/contact.component";
import { PacketsComponent } from "./sites/sub/packets/packets.component";
import { LoginFormComponent } from "./sites/login-form/login-form.component";
import { RegisterFormComponent } from "./sites/register-form/register-form.component";
import { ForgotPasswordFormComponent } from "./sites/forgot-password-form/forgot-password-form.component";
import { ResetPasswordFormComponent } from "./sites/reset-password-form/reset-password-form.component";
import { PacketsAddComponent } from "./sites/packets-add/packets-add.component";

const routes: Routes = [
    { path: "login", component: LoginFormComponent },
    { path: "register", component: RegisterFormComponent },
    { path: "forgot-password", component: ForgotPasswordFormComponent },
    { path: "reset-password/:token/:email", component: ResetPasswordFormComponent },

    { path: "", component: MainPageComponent },
    {
        path: "sub",
        component: SubPageComponent,
        children: [
            { path: "packet-add", component: PacketsAddComponent },
            { path: "contact", component: ContactComponent },
            { path: "packets", component: PacketsComponent },

            { path: "producers", component: ProducersListComponent },
            { path: "add", component: ProducersEditComponent },
            { path: "edit/:id", component: ProducersEditComponent },
            { path: "view/:id", component: ProducersViewComponent },
            { path: "delete/:id", component: ProducersDeleteComponent },
        ],
    },
    {
        path: "producers",
        children: [
            { path: "", component: ProducersListComponent },
            { path: "add", component: ProducersEditComponent },
            { path: "edit/:id", component: ProducersEditComponent },
            { path: "view/:id", component: ProducersViewComponent },
            { path: "delete/:id", component: ProducersDeleteComponent },
        ],
    },
    {
        path: "packets",
        children: [
            { path: "", component: PacketsListComponent },
            { path: "add", component: PacketsEditComponent },
            { path: "edit/:id", component: PacketsEditComponent },
            { path: "view/:id", component: PacketsViewComponent },
            { path: "delete/:id", component: PacketsDeleteComponent },
            { path: "edit/:id/form_add_file", component: PacketFormAddFileComponent },
        ],
    },
    {
        path: "files",
        children: [{ path: "", component: UploadFileComponent }],
    },
    {
        path: "home",
        children: [{ path: "", component: HomeComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
