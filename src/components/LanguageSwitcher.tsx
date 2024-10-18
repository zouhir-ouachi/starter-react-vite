import React, { useContext } from "react";
import { I18nContext } from "../context/I18nContext";

const LanguageSwitcher: React.FC = () => {
  const i18nContext = useContext(I18nContext);

  if (!i18nContext) {
    throw new Error("LanguageSwitcher must be used within an I18nProvider");
  }

  const { language, toggleLanguage } = i18nContext;

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {language === "en" ? "Switch to Arabic" : "Switch to English"}
    </button>
  );
};

export default LanguageSwitcher;
