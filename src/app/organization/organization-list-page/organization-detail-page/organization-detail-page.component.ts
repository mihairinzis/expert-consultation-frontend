import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OrganizationDetailPageStore} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page-store.service";
import {Observable} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/organization-detail-page/model/organization";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, map, take, tap} from "rxjs/operators";
import {FormService} from "@app/shared/templates/form/form.service";

@Component({
  selector: 'ec-organization-detail-page',
  templateUrl: './organization-detail-page.component.html',
  styleUrls: ['./organization-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrganizationDetailPageStore, FormService]
})
export class OrganizationDetailPageComponent {

  data$: Observable<{
    organization: Organization
  }>;

  form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]]
  })

  constructor(private organizationDetailPageStore: OrganizationDetailPageStore,
              private formService: FormService,
              private formBuilder: FormBuilder) {
    this.formService.init(this.form);

    this.data$ = this.organizationDetailPageStore.organization$
      .pipe(
        tap(organization => this.resetForm(organization)),
        map(organization => ({organization})),
        catchError(err => this.formService.setError(err)),
      );
  }

  saveOrganization(): void {
    this.organizationDetailPageStore.saveOrganization(this.form.value)
      .pipe(
        take(1),
        tap(() => this.formService.success$.next('Organizatia a fost salvata')),
        catchError(err => this.formService.setError(err))
      ).subscribe();
  }

  resetForm(organization: Organization): void {
    this.form.patchValue(organization);
  }
}
