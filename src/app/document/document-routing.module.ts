import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocumentListPageComponent} from "@app/document/document-list-page/document-list-page.component";
import {DocumentDetailPageComponent} from "@app/document/document-list-page/document-detail-page/document-detail-page.component";

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
      data: {breadcrumb: 'document.breadcrumb.new'},
    },
    {
      path: ':documentId',
      component: DocumentDetailPageComponent,
      data: {breadcrumb: 'document.breadcrumb.detail'},
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
