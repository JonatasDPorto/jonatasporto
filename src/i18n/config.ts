import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslations from './locales/pt.json';
import enTranslations from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: ptTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    fallbackLng: 'pt',
    defaultNS: 'translation',
    returnEmptyString: false,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'],
      checkWhitelist: true,
    },
  });

export default i18n;

