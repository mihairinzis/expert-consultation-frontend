import {Injectable} from '@angular/core';
import {merge, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {switchMap, tap} from "rxjs/operators";
import {RoutingService} from "@app/core/services/routing.service";
import {Document} from "@app/document/document-list-page/model/document";

@Injectable()
export class DocumentDetailPageStore {
  public static DOCUMENT_DETAIL_PATH = 'documents/';

  document$: Observable<Document>;

  private savedDocument$ = new Subject<Document>();

  constructor(private http: HttpClient,
              private routingService: RoutingService) {
    this.document$ = this.document();
  }

  saveDocument(document: Document): Observable<Document> {
    const request = document.id
      ? this.http.put<Document>(`${environment.api}/documents/${document.id}`, document)
      : this.http.post<Document>(`${environment.api}/documents`, document);

    return request
      .pipe(
        tap(saved => this.savedDocument$.next(saved))
      );
  }

  private document(): Observable<Document> {
    const initialDoc$ = this.routingService.getParamChanges(DocumentDetailPageStore.DOCUMENT_DETAIL_PATH, 'documentId')
      .pipe(
        switchMap(id => Number(id)
          ? this.http.get<Document>(`${environment.api}/documents/${id}`)
          : of(new Document()))
      );
    return merge(initialDoc$, this.savedDocument$);
  }
}
