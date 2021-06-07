import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {I18nMessage} from "@app/shared/model/i18n-message";

@Component({
  selector: 'ec-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() abstractControl: AbstractControl;
  @Input() errorMessages: {[key: string] : I18nMessage | string};
  @Input() controlType: string;
  @Input() label: string;

  get control(): FormControl {
    return this.abstractControl as FormControl;
  }

  errorMessage(key: any): I18nMessage | null {
    const message = this.errorMessages && this.errorMessages[key];
    return message ? new I18nMessage(message) : null;
  }
}
