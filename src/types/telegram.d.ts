interface TelegramWebApp {
  close: () => void;
  ready: () => void;
  expand: () => void;
  colorScheme: string;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export {}; 