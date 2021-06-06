import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationListPageComponent} from "@app/organization/organization-list-page/organization-list-page.component";
import {OrganizationDetailPageComponent} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page.component";

const routes: Routes = [{
  path: '',
  data: {breadcrumb: 'organization.breadcrumb.list'},
  children: [
    {
      path: '',
      component: OrganizationListPageComponent,
    },
    {
      path: 'new',
      component: OrganizationDetailPageComponent,
      data: {breadcrumb: 'organization.breadcrumb.new'},
    },
    {
      path: ':organizationId',
      component: OrganizationDetailPageComponent,
      data: {breadcrumb: 'organization.breadcrumb.detail'},
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
