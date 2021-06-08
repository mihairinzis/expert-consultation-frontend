import { Injectable } from '@angular/core';
import {merge, Observable, of, Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {I18nMessage} from "@app/shared/model/i18n-message";
import {FormGroup} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Injectable()
export class FormService {

  showAlert$: Observable<{type: 'success' | 'warn' | 'error', message: I18nMessage} | null>;
  valid$: Observable<boolean>;
  error$ = new Subject<I18nMessage>();
  success$ = new Subject<I18nMessage | string>();
  editable: boolean;

  private form: FormGroup;

  init(form: FormGroup, editable?:boolean): void {
    this.form = form;
    this.editable = editable || true;
    this.showAlert$ = this.showAlert();
    this.valid$ = this.valid();
  }

  resetForm(resetValue?: any): void {
    if (resetValue) {
      this.form?.patchValue(resetValue);
    }
    this.form?.markAsUntouched();
    this.form?.markAsPristine();
  }

  setError(err: HttpErrorResponse | I18nMessage, formValue?: any): Observable<any> {
    if (err instanceof HttpErrorResponse) {
      if (err.error?.fieldErrors) {
        // TODO: assign potential field errors
      }
      if (err.error?.errors?.length) {
        this.error$.next(err.error.errors[0]);
      } else {
        this.error$.next({i18nKey: `${err.status} - ${err.statusText}`})
      }
    } else {
      this.error$.next(err);
    }
    return of(formValue);
  }

  private showAlert(): Observable<{type: 'success' | 'warn' | 'error', message: I18nMessage} | null> {
    const error$ = this.error$
      .pipe(
        map(err => err ? ({type: 'error' as any, message: err}) : null)
      );
    const success$ = this.success$
      .pipe(
        map(success => success ? ({type: 'success' as any, message: new I18nMessage(success)}) : null)
      );

    return merge(error$, success$);
  }

  private valid(): Observable<boolean> {
    return this.form.statusChanges
      .pipe(
        startWith('INVALID'),
        map(validity => validity === 'VALID')
      );
  }

}
