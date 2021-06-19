import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "@app/app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {RoutingService} from "@app/core/services/routing.service";
import {CanLeaveComponentGuard} from "@app/core/guards/can-leave-component.guard";
import {DialogModule} from "@ngneat/dialog";
import {HotToastModule} from "@ngneat/hot-toast";
import {HttpEventInterceptor} from "@app/core/interceptors/http-event-interceptor";
import {ConfirmDialogComponent} from '@app/shared/components/confirm-dialog/confirm-dialog.component';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

const modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  HotToastModule.forRoot(),
  DialogModule.forRoot({
    confirm: {
      component: ConfirmDialogComponent
    }
  }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  })
];

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpEventInterceptor,
    multi: true
  },
  RoutingService,
  CanLeaveComponentGuard
];

@NgModule({
  imports: [modules],
  providers: [providers]
})
export class CoreModule { }
