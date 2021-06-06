import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "@app/app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from "@angular/common/http";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  })
]

@NgModule({
  imports: [modules]
})
export class CoreModule { }
