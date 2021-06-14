import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OrganizationDetailPageStore} from "@app/organization/organization-list-page/organization-detail-page/organization-detail-page-store.service";
import {Observable} from "rxjs";
import {Organization} from "@app/organization/organization-list-page/model/organization";
import {FormBuilder, Validators} from "@angular/forms";
import {catchError, filter, take, tap} from "rxjs/operators";
import {FormService} from "@app/shared/templates/form/form.service";
import {OrganizationCategory} from "@app/organization/organization-list-page/model/organization-category";
import {RoutingService} from "@app/core/services/routing.service";
import {CanLeave} from "@app/core/guards/can-leave-component.guard";

@Component({
  selector: 'ec-organization-detail-page',
  templateUrl: './organization-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrganizationDetailPageStore, FormService]
})
export class OrganizationDetailPageComponent implements OnInit, CanLeave {

  organizationId: string | number | null;
  organization$: Observable<Organization>;

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
              private formBuilder: FormBuilder,
              private routingService: RoutingService) {
    this.formService.init(this.form);

    this.organization$ = this.organizationDetailPageStore.organization$
      .pipe(
        tap(organization => this.resetForm(organization))
      );
  }

  ngOnInit(): void {
    this.organizationId = this.routingService.getParam('organizationId');
  }

  saveOrganization(): void {
    this.organizationDetailPageStore.saveOrganization(this.form.value)
      .pipe(
        take(1),
        catchError(err => this.formService.setError(err, new Organization())),
        filter(org => !this.organizationId && !!org.id),
        tap(org => this.routingService.navigate(['/organizations', org.id])),
      ).subscribe();
  }

  canLeave(): boolean | Observable<boolean> {
    return this.formService.confirmLeaveIfDirty();
  }

  resetForm(organization: Organization): void {
    this.formService.resetForm(organization);
  }

  categoryOptions(): string[] {
    return Object.keys(OrganizationCategory);
  }
}
