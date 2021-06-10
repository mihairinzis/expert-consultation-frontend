import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationListPageComponent} from "@app/organization/organization-list-page/organization-list-page.component";
import {OrganizationDetailPageComponent} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page.component";
import {I18nMessage} from "@app/shared/model/i18n-message";

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
      data: {
        breadcrumb: {i18nKey: 'common.breadcrumb.new', i18nArgs: {value: 'organization.label'}}
      },
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
