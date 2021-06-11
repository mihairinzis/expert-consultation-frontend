import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TopBarStore} from "./top-bar-store.service";
import {combineLatest, Observable} from "rxjs";
import {Link} from "@components/application-layout/top-bar/model/link";
import {map} from "rxjs/operators";

@Component({
  selector: 'ec-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [TopBarStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {

  mobileMenuOpen = false;
  data$: Observable<{
    links: Link[],
    currentUserName: string,
  }>;

  constructor(private topBarStore: TopBarStore) {
    this.data$ = combineLatest([this.topBarStore.links$, this.topBarStore.currentUserName$])
      .pipe(
        map(([links, currentUserName]) => ({links, currentUserName}))
      );
  }

}
