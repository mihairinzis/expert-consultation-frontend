import {Injectable} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Page} from "@app/shared/model/page";
import {Document} from "@app/document/document-list-page/model/document";

@Injectable()
export class DocumentListPageStore {

  documents$: Observable<Page<Document>>;

  newPageIndex$ = new Subject<number>();
  newPageSize$ = new Subject<number>();
  newSort$ = new Subject<string>();
  titleFilter$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.documents$ = this.documents();
  }

  private documents(): Observable<Page<Document>> {
    return combineLatest([
      this.newPageIndex$.pipe(startWith(1)),
      this.newPageSize$.pipe(startWith(20)),
      this.newSort$.pipe(startWith('id,desc')),
      this.titleFilter$.pipe(startWith(''), debounceTime(500))
    ])
      .pipe(
        map(([page, size, sort, title]) => ({page, size, sort, title})),
        switchMap(params => this.http.get<Page<Document>>(`${environment.api}/documents`, {params}))
      );
  }
}
