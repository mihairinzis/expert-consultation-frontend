import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {RoutingService} from "@app/core/services/routing.service";
import {CreateHotToastRef, HotToastService} from "@ngneat/hot-toast";
import {TranslateService} from "@ngx-translate/core";
import {I18nMessage} from "@app/shared/model/i18n-message";
import {RouteData} from "@app/core/model/route-data";

@Injectable()
export class HttpEventInterceptor implements HttpInterceptor {

  constructor(private routingService: RoutingService,
              private toast: HotToastService,
              private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loading = this.showLoading();
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            loading?.close();
            if (request.method !== 'GET') {
              this.showSuccess(this.routingService.currentRoute?.routeConfig?.data);
            }
          }
        }),
        catchError(err => {
          loading?.close();
          if (err.error?.errors?.length) {
            this.toast.error(err.error.errors[0]);
          } else {
            this.toast.error(`${err.status} - ${err.statusText}`)
          }
          return throwError(err.error);
        }),
    );
  }

  private showLoading(): CreateHotToastRef<any> | null {
    if ((this.translateService as any).pending) {
      return null;
    }
    return this.toast.loading(this.translate('common.request.pending'));
  }

  private showSuccess(routeData?: RouteData): void {
    const savedMessage = routeData?.savedMessage;
    if ((this.translateService as any).pending || !savedMessage) {
      return;
    }
    this.toast.success(this.translate(savedMessage))
  }

  private translate(message?: string | I18nMessage): string {
    if (!message) {
      return '';
    }
    const i18nMessage = new I18nMessage(message);
    return this.translateService.instant(i18nMessage.i18nKey, i18nMessage.i18nArgs);
  }
}
