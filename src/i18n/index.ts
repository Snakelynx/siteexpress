import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import heTranslations from './locales/he.json';
import elTranslations from './locales/el.json';
import itTranslations from './locales/it.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
      he: { translation: heTranslations },
      el: { translation: elTranslations },
      it: { translation: itTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;