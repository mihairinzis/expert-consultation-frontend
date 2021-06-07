import { Injectable } from '@angular/core';
import {merge, Observable, of, Subject} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {RoutingService} from "@app/core/services/routing.service";

@Injectable()
export class OrganizationDetailPageStore {
  public static ORGANIZATION_DETAIL_PATH = 'organizations/';

  organization$: Observable<Organization>;

  private savedOrganization$ = new Subject<Organization>();

  constructor(private http: HttpClient,
              private routingService: RoutingService) {
    this.organization$ = this.organization();
  }

  saveOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${environment.api}/organizations`, organization)
      .pipe(
        tap(saved => this.savedOrganization$.next(saved))
      );
  }

  private organization(): Observable<Organization> {
    const initialOrg$ = this.routingService.getParamChanges(OrganizationDetailPageStore.ORGANIZATION_DETAIL_PATH, 'organizationId')
      .pipe(
        switchMap(id => Number(id)
          ? this.http.get<Organization>(`${environment.api}/organizations/${id}`)
          : of(new Organization()))
      );
    return merge(initialOrg$, this.savedOrganization$);
  }
}
