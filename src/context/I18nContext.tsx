// src/context/I18nContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface I18nContextType {
  language: string;
  toggleLanguage: () => void;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("en");

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.includes("en") ? "ar" : "en");
  };

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLanguage(lng);
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <I18nContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
