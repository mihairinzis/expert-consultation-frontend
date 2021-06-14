import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";

@Component({
  selector: 'ec-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(public ref: DialogRef) { }
}
