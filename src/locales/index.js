import { en } from './en';
import { hi } from './hi';
import { bn } from './bn';

export const locales = {
  en,
  hi,
  bn
};

export const getTranslation = (lang) => {
  return locales[lang] || locales.en;
};
