import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ToastProvider } from './context/toast.tsx';
import './i18next.ts'; //translations
import './types/index.d.ts'; //scss types
import './primereact-theme/themes/mytheme/theme.scss'; //theme
import 'primereact/resources/primereact.min.css'; //core

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);
