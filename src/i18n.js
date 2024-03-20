// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/global.json";
import de from "./locales/de/global.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: "en",
    resources: {
      en: {
        translation: en,
      },
      de: { translation: de },
    },
  });

export default i18n;
