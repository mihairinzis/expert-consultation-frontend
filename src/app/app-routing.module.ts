import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationLayoutComponent} from "@components/application-layout/application-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationLayoutComponent,
    data: {breadcrumb: {info: 'fa-home'}},
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: 'organizations', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
