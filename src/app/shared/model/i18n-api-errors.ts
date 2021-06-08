import {I18nMessage} from "@app/shared/model/i18n-message";

export class I18nApiErrors {
  errors?: I18nMessage[];
  fieldErrors?: {[key: string]: I18nMessage};
  additionalInfo: string;
}
