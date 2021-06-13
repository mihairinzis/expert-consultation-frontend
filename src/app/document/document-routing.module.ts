import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentListPageComponent} from "@app/document/document-list-page/document-list-page.component";
import {DocumentDetailPageComponent} from "@app/document/document-list-page/document-detail-page/document-detail-page.component";
import {CanLeaveComponentGuard} from "@app/core/guards/can-leave-component.guard";
import {RouteData} from "@app/core/model/route-data";

const routes: Routes = [{
  path: '',
  data: {breadcrumb: 'document.breadcrumb.list'},
  children: [
    {
      path: '',
      component: DocumentListPageComponent,
    },
    {
      path: 'new',
      component: DocumentDetailPageComponent,
      data: new RouteData({
        breadcrumb: 'document.breadcrumb.detail',
        savedMessage: 'document.saved'
      }),
      canDeactivate: [CanLeaveComponentGuard]
    },
    {
      path: ':documentId',
      component: DocumentDetailPageComponent,
      data: new RouteData({
        breadcrumb: 'document.breadcrumb.detail',
        savedMessage: 'document.saved'
      }),
      canDeactivate: [CanLeaveComponentGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
