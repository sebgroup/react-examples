export interface AppLanguage {
  appName: string;
  routeNames: {
    home: string;
    components: string;
    about: string;
  };
  components: {
    home: {
      cards: {
        loader: AppLanguageHomeCard & {
          seconds: string;
        };
        notifications: AppLanguageHomeCard & {
          message: string;
          messageText: string;
          type: string;
          typeWarning: string;
          typeError: string;
        };
        pages: AppLanguageHomeCard;
      };
    };
  };
}

interface AppLanguageHomeCard {
  title: string;
  subtitle?: string;
  description?: string;
  buttonTexts?: string[];
  footerMessage?: string;
  note?: string;
}
