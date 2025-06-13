import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Объявляем типы для Telegram Web App
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        close: () => void;
        ready: () => void;
        expand: () => void;
        colorScheme: string;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
      };
    };
  }
}

// Инициализируем Telegram Web App
if (window.Telegram?.WebApp) {
  const WebApp = window.Telegram.WebApp;
  
  // Сообщаем, что приложение готово
  WebApp.ready();
  
  // Расширяем на весь экран, если еще не расширено
  if (!WebApp.isExpanded) {
    WebApp.expand();
  }

  // Устанавливаем тему
  document.documentElement.className = WebApp.colorScheme;
  
  // Устанавливаем высоту viewport
  document.documentElement.style.setProperty(
    '--tg-viewport-height',
    `${WebApp.viewportHeight}px`
  );
  document.documentElement.style.setProperty(
    '--tg-viewport-stable-height',
    `${WebApp.viewportStableHeight}px`
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
