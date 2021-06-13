import {Injectable} from '@angular/core';
import {distinctUntilChanged, filter, map, shareReplay, tap} from 'rxjs/operators';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd, NavigationExtras,
  Router
} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class RoutingService {

  currentRoute: ActivatedRoute;
  currentRoute$ = new ReplaySubject<ActivatedRoute>(1);

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(val => val instanceof NavigationEnd),
        map(() => this.getLeafRoute(this.route)),
        tap(route => this.currentRoute = route),
        tap(route => this.currentRoute$.next(route)),
      ).subscribe();
  }

  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  getParam(param: string): string | number | null {
    return this.getParameter(this.currentRoute?.snapshot, param);
  }

  getParamChanges(url: string, parameter: string): Observable<string | number | null> {
    return this.currentRoute$
      .pipe(
        map(route => this.containsPath(route, url) ? this.getParameter(route.snapshot, parameter) : null),
        distinctUntilChanged((o, n) => o === n),
      );
  }

  private getParameter(routeSnapshot: ActivatedRouteSnapshot, param: string): string | number | null {
    return routeSnapshot.params[param] || routeSnapshot.queryParams[param];
  }

  private containsPath(route: ActivatedRoute, path: string): boolean {
    const url = (route?.snapshot as any)?._routerState?.url as string;
    return !!url?.includes(path);
  }

  private getLeafRoute(route: ActivatedRoute): ActivatedRoute {
    let localRoot = route;
    while (localRoot.firstChild) {
      localRoot = localRoot.firstChild;
    }
    return localRoot;
  }
}
