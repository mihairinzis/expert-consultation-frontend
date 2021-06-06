export class I18nMessage {
  i18nKey: string;
  i18nArgs?: any;

  constructor(message: I18nMessage | string) {
    if (message instanceof I18nMessage) {
      this.i18nKey = message.i18nKey;
      this.i18nArgs = message.i18nArgs;
    } else {
      this.i18nKey = message;
    }
  }
}
