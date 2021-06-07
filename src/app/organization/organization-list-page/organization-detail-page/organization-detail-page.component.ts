import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OrganizationDetailPageStore} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page-store.service";
import {Observable} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, map, take, tap} from "rxjs/operators";
import {FormService} from "@app/shared/templates/form/form.service";
import {
  OrganizationCategory,
  OrganizationCategoryEnum
} from "@app/organization/organization-list-page/model/organization-category";

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
    id: [''],
    name: ['', [Validators.required]],
    category: ['', Validators.required],
    numberOfMembers: [''],
    email: ['', [Validators.email, Validators.required]],
    phoneNumber: [''],
  })

  constructor(private organizationDetailPageStore: OrganizationDetailPageStore,
              public formService: FormService,
              private formBuilder: FormBuilder) {
    this.formService.init(this.form);

    this.data$ = this.organizationDetailPageStore.organization$
      .pipe(
        catchError(err => this.formService.setError(err, new Organization())),
        tap(organization => this.resetForm(organization)),
        map(organization => ({organization}))
      );
  }

  saveOrganization(): void {
    this.organizationDetailPageStore.saveOrganization(this.form.value)
      .pipe(
        take(1),
        catchError(err => this.formService.setError(err, new Organization())),
        tap(() => this.formService.success$.next('Organizatia a fost salvata'))
      ).subscribe();
  }

  resetForm(organization: Organization): void {
    this.formService.resetForm(organization);
  }

  categoryOptions(): string[] {
    return Object.keys(OrganizationCategory);
  }
}
