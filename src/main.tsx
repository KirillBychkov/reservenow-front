import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

//translations
import './i18next.ts';

//scss types
import './types/index.d.ts';

//theme
import './primereact-theme/themes/mytheme/theme.scss';

//core
import 'primereact/resources/primereact.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
