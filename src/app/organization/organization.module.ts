import {NgModule} from '@angular/core';
import {OrganizationRoutingModule } from './organization-routing.module';
import {SharedModule} from "../shared/shared.module";
import {OrganizationListPageComponent} from './organization-list-page/organization-list-page.component';
import {OrganizationDetailPageComponent} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page.component";

@NgModule({
  declarations: [
    OrganizationListPageComponent,
    OrganizationDetailPageComponent
  ],
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
