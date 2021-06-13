import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Link} from "@app/shared/components/application-layout/top-bar/model/link";

@Injectable()
export class TopBarStore {

  links$: Observable<Link[]>;
  currentUserName$: Observable<string>;

  constructor() {
    this.links$ = this.links();
    this.currentUserName$ = this.currentUserName();
  }

  private links(): Observable<Link[]> {
    return of([
      {i18nKey: 'sideNav.dashboard', routerLink: '/'},
      {i18nKey: 'sideNav.organizations', routerLink: 'organizations'},
      {i18nKey: 'sideNav.document', routerLink: 'documents'}
    ]);
  }

  private currentUserName(): Observable<string> {
    return of('John Smith');
  }
}
