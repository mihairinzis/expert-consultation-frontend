import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ec-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
}
