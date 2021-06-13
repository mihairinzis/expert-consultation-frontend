import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormService} from "@app/shared/templates/form/form.service";

@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  @Input() saveLabel: string;
  @Input() discardLabel: string;

  @Output() save = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();

  constructor(public formService: FormService) {}
}
