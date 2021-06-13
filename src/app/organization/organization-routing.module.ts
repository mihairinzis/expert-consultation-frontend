import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationListPageComponent} from "@app/organization/organization-list-page/organization-list-page.component";
import {OrganizationDetailPageComponent} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page.component";
import {CanLeaveComponentGuard} from "@app/core/guards/can-leave-component.guard";
import {RouteData} from "@app/core/model/route-data";

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
      data: new RouteData({
        breadcrumb: 'organization.breadcrumb.detail',
        savedMessage: 'organization.saved'
      }),
      canDeactivate: [CanLeaveComponentGuard]
    },
    {
      path: ':organizationId',
      component: OrganizationDetailPageComponent,
      data: new RouteData({
        breadcrumb: 'organization.breadcrumb.detail',
        savedMessage: 'organization.saved'
      }),
      canDeactivate: [CanLeaveComponentGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
