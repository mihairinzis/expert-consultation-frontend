import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardPageComponent} from "@app/dashboard/dashboard-page/dashboard-page.component";

const routes: Routes = [{
  path: '',
  component: DashboardPageComponent,
  data: {breadcrumb: {skip: true}}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
