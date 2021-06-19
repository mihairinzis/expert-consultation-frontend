import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ec-section',
  templateUrl: './section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() class: string;
}
