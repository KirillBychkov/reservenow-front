import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uaJSON from './locales/ua.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ua: {
        translation: uaJSON,
      },
    },
    lng: 'uk-UA',
    fallbackLng: 'ua',
    debug: true,
  });
