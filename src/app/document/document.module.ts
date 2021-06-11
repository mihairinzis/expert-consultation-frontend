import {NgModule} from '@angular/core';
import {DocumentRoutingModule} from './document-routing.module';
import {DocumentListPageComponent} from './document-list-page/document-list-page.component';
import {DocumentDetailPageComponent} from './document-list-page/document-detail-page/document-detail-page.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    DocumentListPageComponent,
    DocumentDetailPageComponent
  ],
  imports: [
    SharedModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
