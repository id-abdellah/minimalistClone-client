import i18n from "i18next";
import type { InitOptions } from "i18next";
import { initReactI18next, } from "react-i18next";

import english from "./locales/en.json";
import arabic from "./locales/ar.json";


const resources = {
    en: {
        translation: english
    },
    ar: {
        translation: arabic
    }
};

const options: InitOptions = {
    lng: localStorage.getItem("minimalistCloneLang") || "en",
    resources,
    fallbackLng: "en",
    interpolation: {
        escapeValue: true
    }
};

i18n.use(initReactI18next).init(options);

export default i18n;