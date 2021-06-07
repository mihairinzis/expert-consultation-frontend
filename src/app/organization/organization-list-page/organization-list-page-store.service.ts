import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/model/organization";

@Injectable()
export class OrganizationListPageStore {

  organizations$: Observable<Organization[]>;

  constructor() {
    this.organizations$ = this.organizations();
  }

  organizations(): Observable<Organization[]> {
    return of(
      Array(35).fill(0).map((_, i) => new Organization({
        id: String(i),
        name: `mock org ${i}`,
      }))
    )
  }
}
