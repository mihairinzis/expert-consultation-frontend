import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {I18nMessage} from "@app/shared/model/i18n-message";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(private toastrService: ToastrService,
              private translateService: TranslateService) {
  }

  success(message: string | I18nMessage, title?: string): void {
    this.toastrService.success(this.translate(message), this.translate(title), {
      closeButton: true
    });
  }

  error(message: string | I18nMessage, title?: string): void {
    this.toastrService.error(this.translate(message), this.translate(title), {
      closeButton: true
    });
  }

  private translate(message?: string | I18nMessage): string {
    if (!message) {
      return '';
    }
    const i18nMessage = new I18nMessage(message);
    return this.translateService.instant(i18nMessage.i18nKey, i18nMessage.i18nArgs);
  }
}
