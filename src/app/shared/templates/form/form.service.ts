import {Injectable} from '@angular/core';
import {merge, Observable, of, Subject} from "rxjs";
import {I18nMessage} from "@app/shared/model/i18n-message";
import {FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {I18nApiErrors} from "@app/shared/model/i18n-api-errors";
import {DialogService} from "@ngneat/dialog";

@Injectable()
export class FormService {

  saveEnabled$: Observable<boolean>;
  editable: boolean;

  private form: FormGroup;
  private formUntouched$ = new Subject<void>();

  constructor(private dialog: DialogService) {
  }

  init(form: FormGroup, editable?:boolean): void {
    this.form = form;
    this.editable = editable || true;
    this.saveEnabled$ = this.saveEnabled();
  }

  resetForm(resetValue?: any): void {
    if (resetValue) {
      this.form?.patchValue(resetValue);
    }
    this.untouchForm();
  }

  setError(err: I18nApiErrors | I18nMessage, formValue?: any): Observable<any> {
    if ((err as I18nApiErrors).fieldErrors) {
      // TODO: assign potential field errors
    }
    return of(formValue);
  }

  confirmLeaveIfDirty(): boolean | Observable<boolean> {
    if (!this.form.dirty) {
      return true;
    }
    return this.dialog.confirm({} as any, {data: {
        title: 'Inchide',
        message: 'Modificarile nesalvate vor fi pierdute.'
    }}).afterClosed$;
  }

  public untouchForm(): void {
    this.formUntouched$.next();
    this.form?.markAsUntouched();
    this.form?.markAsPristine();
  }

  private saveEnabled(): Observable<boolean> {
    return merge(
      this.form.statusChanges,
      this.formUntouched$.pipe(map(() => 'INVALID'))
    )
      .pipe(
        startWith('INVALID'),
        map(validity => validity === 'VALID')
      );
  }

}
