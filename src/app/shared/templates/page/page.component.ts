import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {I18nMessage} from "@app/shared/model/i18n-message";
import {Observable} from "rxjs";

@Component({
  selector: 'ec-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  @Input() title: string;
  @Input() alert: {type: 'success' | 'warn' | 'error', message: I18nMessage} | null;
}
