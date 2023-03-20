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

const routes: Routes = [
    { path: "", component: SplashScreenComponent },
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
