import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanLeave {
  canLeave: () => boolean | Observable<boolean>;
}

@Injectable()
export class CanLeaveComponentGuard implements CanDeactivate<CanLeave> {

  canDeactivate(component: CanLeave,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canLeave();
  }

}
