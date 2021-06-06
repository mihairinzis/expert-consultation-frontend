import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expert-consultation';

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

}
