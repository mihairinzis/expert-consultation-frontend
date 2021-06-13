import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ec-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent {
  @Input() title: string;
}
