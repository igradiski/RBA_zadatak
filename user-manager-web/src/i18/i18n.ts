import { hr as locale_hr } from "date-fns/locale";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hr from "./hr.json";

const fallbackLng = "hr";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    hr: { translations: hr },
  },
  fallbackLng: fallbackLng,
  debug: false,
  ns: ["translations"],
  defaultNS: "translations",
  fallbackNS: "translations",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

const dateFormats = {
  hr: {
    date: "dd.MM.yyyy",
    dateTime: "dd.MM.yyyy HH:mm",
  },
};

const locales = {
  hr: locale_hr,
};