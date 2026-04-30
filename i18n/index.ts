import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/i18n/locales/en.json';
import es from '@/i18n/locales/es.json';

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const;

export type Language = keyof typeof resources;
export type TranslationKey = keyof typeof es;

export const supportedLanguages = Object.keys(resources) as Language[];

function getInitialLanguage(): Language {
  const languageCode = Localization.getLocales()[0]?.languageCode;

  return languageCode === 'en' ? 'en' : 'es';
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'es',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
