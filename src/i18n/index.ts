import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEn from "./translations/common/en.json";
import commonAr from "./translations/common/ar.json";

import authEn from "./translations/auth/en.json";
import authAr from "./translations/auth/ar.json";

const resources = {
  en: { common: commonEn, auth: authEn },
  ar: { common: commonAr, auth: authAr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    ns: ["common", "auth"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
