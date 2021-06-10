import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NotificationService} from "@app/core/services/notification.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.error?.errors?.length) {
            this.notificationService.error(err.error.errors[0]);
          } else {
            this.notificationService.error({i18nKey: `${err.status} - ${err.statusText}`})
          }
          return throwError(err.error);
        }),
      );
  }
}
