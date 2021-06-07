import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OrganizationListPageStore} from "@app/organization/organization-list-page/organization-list-page-store.service";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {Observable} from "rxjs";

@Component({
  selector: 'ec-organization-list-page',
  templateUrl: './organization-list-page.component.html',
  styleUrls: ['./organization-list-page.component.scss'],
  providers: [OrganizationListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListPageComponent {
  organizations$: Observable<Organization[]>;

  constructor(private organizationListPageStore: OrganizationListPageStore) {
    this.organizations$ = this.organizationListPageStore.organizations$;
  }
}
