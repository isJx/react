import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en/translation";

i18n
  // 检测用户当前使用的语言
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    debug: true,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
    },
  });
// 配置参数的文档: https://www.i18next.com/overview/configuration-options

export default i18n;
