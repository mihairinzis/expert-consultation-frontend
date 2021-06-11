import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DocumentListPageStore} from "@app/document/document-list-page/document-list-page-store.service";
import {Observable} from "rxjs";
import {Page} from "@app/shared/model/page";
import {Document} from "@app/document/document-list-page/model/document";

@Component({
  selector: 'ec-document-list-page',
  templateUrl: './document-list-page.component.html',
  styleUrls: ['./document-list-page.component.scss'],
  providers: [DocumentListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListPageComponent {

  documents$: Observable<Page<Document>>;

  constructor(private documentListPageStore: DocumentListPageStore) {
    this.documents$ = this.documentListPageStore.documents$;
  }

  onSearchChange($event: Event): void {
    this.documentListPageStore.titleFilter$.next(($event.target as any)?.value);
  }
}
