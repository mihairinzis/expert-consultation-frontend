import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OrganizationListPageStore} from "@app/organization/organization-list-page/organization-list-page-store.service";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {Observable} from "rxjs";
import {Page} from "@app/shared/model/page";

@Component({
  selector: 'ec-organization-list-page',
  templateUrl: './organization-list-page.component.html',
  providers: [OrganizationListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListPageComponent {
  organizations$: Observable<Page<Organization>>;

  constructor(private organizationListPageStore: OrganizationListPageStore) {
    this.organizations$ = this.organizationListPageStore.organizations$;
  }

  onSearchChange($event: Event) {
    this.organizationListPageStore.nameFilter$.next(($event.target as any)?.value);
  }
}
