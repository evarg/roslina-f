import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProducersAddComponent } from './sites/producers/producers-add/producers-add.component';
import { ProducersEditComponent } from './sites/producers/producers-edit/producers-edit.component';
import { ProducersListComponent } from './sites/producers/producers-list/producers-list.component';
import { ProducersViewComponent } from './sites/producers/producers-view/producers-view.component';
import { ProducersDeleteComponent } from './sites/producers/producers-delete/producers-delete.component';

import { PacketsAddComponent } from './sites/packets/packets-add/packets-add.component';
import { PacketsEditComponent } from './sites/packets/packets-edit/packets-edit.component';
import { PacketsListComponent } from './sites/packets/packets-list/packets-list.component';
import { PacketsViewComponent } from './sites/packets/packets-view/packets-view.component';
import { PacketsDeleteComponent } from './sites/packets/packets-delete/packets-delete.component';

const routes: Routes = [
  { path: 'producers', component: ProducersListComponent },
  { path: 'producers/add', component: ProducersAddComponent },
  { path: 'producers/edit/:id', component: ProducersEditComponent },
  { path: 'producers/view/:id', component: ProducersViewComponent },
  { path: 'producers/delete/:id', component: ProducersDeleteComponent },

  { path: 'packets', component: PacketsListComponent },
  { path: 'packets/add', component: PacketsAddComponent },
  { path: 'packets/edit/:id', component: PacketsEditComponent },
  { path: 'packets/view/:id', component: PacketsViewComponent },
  { path: 'packets/delete/:id', component: PacketsDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
