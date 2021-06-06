import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ec-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  @Input() type: 'success' | 'warn' | 'error';
  @Input() show: boolean;
  @Input() dismissAfter: number;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.dismissAfter) {
      setTimeout(() => {
        this.show = false;
        this.changeDetectorRef.markForCheck();
      }, this.dismissAfter)
    }
  }
}
