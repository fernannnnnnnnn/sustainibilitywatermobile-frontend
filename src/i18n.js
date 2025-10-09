import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON bahasa
import en from "./screens/translations/en.json";
import id from "./screens/translations/id.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3", // agar kompatibel untuk React Native
  resources: {
    en: { translation: en },
    id: { translation: id },
  },
  lng: "id", // default language
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
