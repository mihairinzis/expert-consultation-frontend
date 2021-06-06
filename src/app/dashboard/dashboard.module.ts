import { NgModule } from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from "@app/shared/shared.module";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
