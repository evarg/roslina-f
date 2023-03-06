import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProducersAddComponent } from './sites/producers/producers-add/producers-add.component';
import { ProducersEditComponent } from './sites/producers/producers-edit/producers-edit.component';
import { ProducersListComponent } from './sites/producers/producers-list/producers-list.component';
import { ProducersViewComponent } from './sites/producers/producers-view/producers-view.component';

const routes: Routes = [
  { path: 'producers', component: ProducersListComponent },
  { path: 'producers/add', component: ProducersAddComponent },
  { path: 'producers/edit/:id', component: ProducersEditComponent },
  { path: 'producers/view/:id', component: ProducersViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
