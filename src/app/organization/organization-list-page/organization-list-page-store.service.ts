import {Injectable} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {debounceTime, map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Page} from "@app/shared/model/page";

@Injectable()
export class OrganizationListPageStore {

  organizations$: Observable<Page<Organization>>;

  newPageIndex$ = new Subject<number>();
  newPageSize$ = new Subject<number>();
  newSort$ = new Subject<string>();
  nameFilter$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.organizations$ = this.organizations();
  }

  private organizations(): Observable<Page<Organization>> {

    return combineLatest([
      this.newPageIndex$.pipe(startWith(0)),
      this.newPageSize$.pipe(startWith(20)),
      this.newSort$.pipe(startWith('id,desc')),
      this.nameFilter$.pipe(
        startWith(''),
        debounceTime(500)
      )
    ])
      .pipe(
        map(([page, size, sort, name]) => ({page, size, sort, name})),
        switchMap(params => this.http.get<Page<Organization>>(`${environment.api}/organizations`, {params}))
      );
  }
}
