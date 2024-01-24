import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uaJSON from './locales/ua.json';
import enJSON from './locales/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      'uk-UA': {
        translation: uaJSON,
      },
      'en-US': {
        translation: enJSON,
      },
    },
    lng: 'uk-UA',
    fallbackLng: 'uk-UA',
    debug: true,
  });
