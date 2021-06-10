export class I18nMessage {
  i18nKey: string;
  i18nArgs?: any;

  constructor(message: I18nMessage | string) {
    if ((message as I18nMessage)?.i18nKey) {
      Object.assign(this, message);
    } else {
      this.i18nKey = message as string;
    }
  }
}
